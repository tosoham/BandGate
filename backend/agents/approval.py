"""Human Approval Gate.

Applies a reviewer decision to a question: records the Approval, advances the
status, sets (or clears) the final answer, and appends an AuditEvent. Human
approval is a feature, not a weakness — high-risk commitments hold here until a
person signs off.
"""

import hashlib
import json
import uuid
from datetime import datetime, timezone

from core.schemas import Approval, AuditEvent, BandGateState, RFPQuestionState

VALID_DECISIONS = {"approved", "approved_with_edits", "rejected", "escalated"}

# Where each decision leaves the question in the lifecycle.
_DECISION_STATUS = {
    "approved": "approved",
    "approved_with_edits": "approved",
    "rejected": "human_review",
    "escalated": "human_review",
}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _append_audit(
    state: BandGateState, *, actor: str, action: str, question_id: str, summary: str, payload: dict
) -> AuditEvent:
    event = AuditEvent(
        event_id=f"evt-{uuid.uuid4().hex[:8]}",
        timestamp=_now(),
        actor=actor,
        action=action,
        question_id=question_id,
        summary=summary,
        payload_hash=hashlib.sha256(
            json.dumps(payload, sort_keys=True, default=str).encode("utf-8")
        ).hexdigest()[:16],
    )
    state.audit_trail.append(event)
    return event


def apply_decision(
    state: BandGateState,
    question_id: str,
    decision: str,
    *,
    approver_role: str,
    approver_name: str | None = None,
    comment: str | None = None,
    final_answer: str | None = None,
) -> RFPQuestionState:
    if question_id not in state.questions:
        raise KeyError(question_id)
    if decision not in VALID_DECISIONS:
        raise ValueError(f"invalid decision: {decision}")

    question = state.questions[question_id]
    question.approvals.append(
        Approval(
            approver_role=approver_role,
            approver_name=approver_name,
            decision=decision,
            comment=comment,
            timestamp=_now(),
        )
    )
    question.status = _DECISION_STATUS[decision]

    if decision in ("approved", "approved_with_edits"):
        if final_answer:
            question.final_answer = final_answer
    elif decision == "rejected":
        question.final_answer = None

    _append_audit(
        state,
        actor=approver_role,
        action=f"human_decision:{decision}",
        question_id=question_id,
        summary=f"{approver_role} {decision.replace('_', ' ')} {question_id}",
        payload={"decision": decision, "comment": comment, "final_answer": final_answer},
    )
    return question
