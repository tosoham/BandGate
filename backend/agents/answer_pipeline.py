"""Answer-half pipeline (Ishita).

Runs the "produce the answer" agents over the canonical state and attaches their
opinions to each question: Sales drafts, Security RAG retrieves evidence, and
Product checks capability. The gate half (Commitment Guard, Adversarial Review,
Human Approval) consumes these opinions downstream via the orchestrator.

Kept separate from agents/orchestrator.py so both halves can evolve
independently while sharing the same state contract.
"""

from agents.product_capability import assess_capability
from agents.sales_engineer import draft_answer
from agents.security_compliance import answer_from_evidence
from core.citation_gate import enforce
from core.schemas import BandGateState, RFPQuestionState


def run_answer_pipeline(state: BandGateState) -> BandGateState:
    for question in state.questions.values():
        _populate_opinions(question)
    return state


def _populate_opinions(question: RFPQuestionState) -> None:
    assigned = set(question.assigned_agents)
    opinions = []

    # Sales and Security are the base of every answer; Product joins when assigned.
    opinions.append(draft_answer(question.raw_question, question.risk_tags))
    opinions.append(answer_from_evidence(question.normalized_question))
    if "product_capability" in assigned:
        opinions.append(assess_capability(question.normalized_question))

    # Citation gate: no opinion may claim evidence support without citations.
    question.opinions = [enforce(opinion) for opinion in opinions]
    # Draft + evidence are done; the question is ready for policy review.
    question.status = "evidence_review"
