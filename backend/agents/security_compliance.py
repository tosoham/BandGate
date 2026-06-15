"""Security & Compliance RAG agent.

Answers strictly from approved security/compliance evidence. Every answer either
carries citations to the knowledge base or is explicitly marked unsupported.
This is the citation gate: no evidence, no supported claim.
"""

from core.rag import retrieve
from core.schemas import AgentOpinion

AGENT_NAME = "security_compliance"

_UNSUPPORTED = (
    "No approved evidence was found for this question. The claim is unsupported "
    "and must be escalated rather than answered."
)


def answer_from_evidence(question: str, top_k: int = 4) -> AgentOpinion:
    evidence = retrieve(question, top_k=top_k)

    if not evidence:
        return AgentOpinion(
            agent_name=AGENT_NAME,
            provider="deterministic",
            model_name="day2-rag",
            answer=_UNSUPPORTED,
            confidence=0.0,
            evidence=[],
            risk_tags=["unsupported"],
        )

    # Build the answer from the highest-confidence approved wording we retrieved.
    answer = evidence[0].quote
    confidence = round(min(1.0, sum(e.confidence for e in evidence) / len(evidence)), 2)

    return AgentOpinion(
        agent_name=AGENT_NAME,
        provider="deterministic",
        model_name="day2-rag",
        answer=answer,
        confidence=confidence,
        evidence=evidence,
        risk_tags=["supported_by_evidence"],
    )
