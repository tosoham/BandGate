"""Citation gate — the answer-half hallucination guard.

Hard rule (PLAN section 5): no answer may present a material claim as supported
unless it is actually backed by retrieved evidence. This module enforces that on
agent opinions: anything tagged ``supported_by_evidence`` that carries no
evidence is downgraded to ``unsupported`` rather than allowed through.

The gate half (Commitment Guard / Adversarial Reviewer) applies the policy-side
rules; this is the evidence-side check the answer half owns.
"""

from core.schemas import AgentOpinion

SUPPORTED_TAG = "supported_by_evidence"
UNSUPPORTED_TAG = "unsupported"

_UNSUPPORTED_ANSWER = (
    "No approved evidence was found for this question. The claim is unsupported "
    "and must be escalated rather than answered."
)


def is_grounded(opinion: AgentOpinion) -> bool:
    """An opinion claiming evidence support must actually carry citations."""
    if SUPPORTED_TAG in opinion.risk_tags:
        return len(opinion.evidence) > 0
    return True


def enforce(opinion: AgentOpinion) -> AgentOpinion:
    """Downgrade an ungrounded 'supported' opinion to an explicit unsupported one."""
    if is_grounded(opinion):
        return opinion

    return opinion.model_copy(
        update={
            "answer": _UNSUPPORTED_ANSWER,
            "confidence": 0.0,
            "evidence": [],
            "risk_tags": [
                tag for tag in opinion.risk_tags if tag != SUPPORTED_TAG
            ]
            + [UNSUPPORTED_TAG],
        }
    )
