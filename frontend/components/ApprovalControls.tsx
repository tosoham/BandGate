"use client";

import { useState } from "react";
import type { RFPQuestionState } from "../lib/types";

export type Decision = "approved" | "approved_with_edits" | "rejected" | "escalated";

export default function ApprovalControls({
  question,
  recommended,
  onDecide,
}: {
  question: RFPQuestionState;
  recommended: string;
  onDecide: (decision: Decision, role: string, finalAnswer?: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(recommended);

  const decided = question.approvals.length > 0;
  const lastDecision = decided ? question.approvals[question.approvals.length - 1] : null;

  return (
    <article className="reviewPanel approvalPanel">
      <h3>Human Approval Gate</h3>

      {decided && lastDecision && (
        <div className={`decisionBadge decision-${lastDecision.decision}`}>
          {lastDecision.approver_role} · {lastDecision.decision.replaceAll("_", " ")}
        </div>
      )}

      <div className="recommended">
        <span className="recommendedLabel">Recommended final wording</span>
        <p>{recommended || "No evidence-backed wording available — escalate before answering."}</p>
      </div>

      {question.final_answer && (
        <div className="finalAnswer">
          <span className="recommendedLabel">Recorded final answer</span>
          <p>{question.final_answer}</p>
        </div>
      )}

      {editing ? (
        <div className="editBox">
          <textarea
            className="editArea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
          />
          <div className="actionRow">
            <button
              type="button"
              className="btn btn-approve"
              onClick={() => {
                onDecide("approved_with_edits", "Legal", draft);
                setEditing(false);
              }}
            >
              Save &amp; approve
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="actionRow">
          <button type="button" className="btn btn-approve" onClick={() => onDecide("approved", "Legal", recommended)}>
            Approve
          </button>
          <button
            type="button"
            className="btn btn-edit"
            onClick={() => {
              setDraft(question.final_answer ?? recommended);
              setEditing(true);
            }}
          >
            Approve with edits
          </button>
          <button type="button" className="btn btn-escalate" onClick={() => onDecide("escalated", "Legal")}>
            Escalate · Legal
          </button>
          <button type="button" className="btn btn-escalate-sec" onClick={() => onDecide("escalated", "Security")}>
            Escalate · Security
          </button>
          <button type="button" className="btn btn-reject" onClick={() => onDecide("rejected", "Legal")}>
            Reject
          </button>
        </div>
      )}
    </article>
  );
}
