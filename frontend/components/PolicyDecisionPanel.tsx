import Icon from "./Icon";
import type { PolicyViolation, RFPQuestionState } from "../lib/types";

function collectViolations(question: RFPQuestionState): PolicyViolation[] {
  const seen = new Set<string>();
  const all: PolicyViolation[] = [];
  for (const opinion of question.opinions) {
    for (const v of opinion.policy_violations ?? []) {
      const key = `${v.policy_id}:${v.claim}`;
      if (!seen.has(key)) {
        seen.add(key);
        all.push(v);
      }
    }
  }
  return all;
}

export default function PolicyDecisionPanel({ question }: { question: RFPQuestionState }) {
  const violations = collectViolations(question);

  return (
    <article className="reviewPanel">
      <h3>
        <Icon name="policy" size={15} />
        Policy Decision
        {violations.length > 0 && <span className="countPill">{violations.length}</span>}
      </h3>

      {violations.length > 0 ? (
        <ul className="policyList">
          {violations.map((v) => (
            <li key={`${v.policy_id}-${v.claim}`} className="policyCard">
              <div className="policyCardHead">
                <span className={`risk risk-${v.severity}`}>{v.severity}</span>
                <span className="policyId">{v.policy_id}</span>
              </div>
              <dl className="policyFlow">
                <div className="policyStep step-blocked">
                  <dt>Blocked claim</dt>
                  <dd>{v.claim}</dd>
                </div>
                <div className="policyStep step-allowed">
                  <dt>Allowed position</dt>
                  <dd>{v.allowed_position}</dd>
                </div>
                <div className="policyStep step-fix">
                  <dt>Recommended wording</dt>
                  <dd>{v.recommended_fix}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      ) : question.conflict_detected ? (
        <div className="policyConflict">
          <p>{question.conflict_summary ?? "Draft conflicts with approved policy and is held for review."}</p>
          <div className="tagLine">
            {question.risk_tags.map((tag) => (
              <span key={tag}>{tag.replaceAll("_", " ")}</span>
            ))}
          </div>
          <p className="policyNote">Structured policy positions pending Commitment Guard sign-off.</p>
        </div>
      ) : (
        <div className="policyClear">
          <Icon name="check" size={16} />
          <p>No policy violations — the draft stays within approved commitment limits.</p>
        </div>
      )}
    </article>
  );
}
