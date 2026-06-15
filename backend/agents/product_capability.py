"""Product Capability agent.

Classifies what the product can actually do today, so the final answer never
treats roadmap or scoping-dependent features as standard. Capability levels
match the corpus in knowledge_base/product/product_capabilities.md.
"""

from core.rag import retrieve
from core.schemas import AgentOpinion

AGENT_NAME = "product_capability"

# (capability level, human summary, keywords that imply it). First match wins.
_RULES: list[tuple[str, str, tuple[str, ...]]] = [
    (
        "architecturally_possible",
        "Available only under a specific deployment option or addendum, not as a "
        "standard commitment.",
        ("99.9", "99.99", "uptime", "high availability", "ha "),
    ),
    (
        "requires_custom_scoping",
        "Feasible but requires technical scoping before a timeline or commitment "
        "can be given.",
        ("custom", "integration", "two weeks", "timeline", "managed keys", "byok"),
    ),
    (
        "roadmap_only",
        "Planned on the roadmap and must not be committed in an RFP response.",
        ("roadmap", "future", "planned", "upcoming"),
    ),
]

_DEFAULT = (
    "generally_available",
    "Generally available to enterprise customers today.",
)


def assess_capability(question: str, top_k: int = 4) -> AgentOpinion:
    text = question.lower()
    level, summary = _DEFAULT
    for candidate_level, candidate_summary, keywords in _RULES:
        if any(keyword in text for keyword in keywords):
            level, summary = candidate_level, candidate_summary
            break

    # Cite product corpus where possible.
    evidence = [e for e in retrieve(question, top_k=top_k) if e.document_name.startswith("product/")]

    return AgentOpinion(
        agent_name=AGENT_NAME,
        provider="deterministic",
        model_name="day2-rule",
        answer=f"Capability: {level.replace('_', ' ')}. {summary}",
        confidence=0.6,
        evidence=evidence,
        risk_tags=[f"capability_{level}"],
    )

from core.schemas import AgentOpinion, Evidence, RFPQuestionState


def check_product_capability(question: RFPQuestionState) -> AgentOpinion:
    text = question.raw_question.lower()
    evidence: list[Evidence] = []

    if "uptime" in text or "high availability" in text:
        answer = "99.9% uptime is architecturally possible only with HA deployment and a separate addendum."
        evidence.append(
            Evidence(
                source_id="product/ha_architecture",
                document_name="ha_architecture.md",
                chunk_id="ha-deployment",
                quote=answer,
                confidence=0.9,
            )
        )
    elif "deployment" in text or "two weeks" in text or "implementation" in text:
        answer = "Standard implementation is planned over at least 8 weeks; custom integrations require scoping."
        evidence.append(
            Evidence(
                source_id="product/implementation_timeline",
                document_name="implementation_timeline.md",
                chunk_id="standard-timeline",
                quote=answer,
                confidence=0.88,
            )
        )
    else:
        answer = "No product limitation was identified beyond normal enterprise scoping."

    return AgentOpinion(
        agent_name="product_capability",
        answer=answer,
        confidence=0.82 if evidence else 0.55,
        evidence=evidence,
        risk_tags=question.risk_tags,
    )
