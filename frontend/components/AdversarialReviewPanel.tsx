import Icon, { type IconName } from "./Icon";
import type { AdversarialCategory, AdversarialFinding, RFPQuestionState, RiskLevel } from "../lib/types";

const SEVERITY_WEIGHT: Record<RiskLevel, number> = { critical: 0.9, high: 0.72, medium: 0.45, low: 0.2 };

const CATEGORY_META: Record<AdversarialCategory, { label: string; icon: IconName }> = {
  prompt_injection: { label: "Prompt injection", icon: "block" },
  unsupported_claim: { label: "Unsupported claim", icon: "alert" },
  contradiction: { label: "Contradiction", icon: "flag" },
  sensitive_disclosure: { label: "Sensitive disclosure", icon: "lock" },
  hallucination: { label: "Hallucination risk", icon: "risk" },
};

// When the backend hasn't published structured findings, derive a faithful view
// from the signals already on the question so the red-team panel is never blank.
function deriveFindings(question: RFPQuestionState): AdversarialFinding[] {
  const findings: AdversarialFinding[] = [];

  if (question.risk_tags.includes("prompt_injection")) {
    findings.push({
      finding_id: "adv-injection",
      category: "prompt_injection",
      severity: "critical",
      claim: "Buyer-supplied instruction embedded in the question text",
      detail: "Question attempts to override internal policy. Quarantined as untrusted input; not executed.",
      hallucination_score: 0.92,
    });
  }

  if (question.conflict_detected) {
    findings.push({
      finding_id: "adv-conflict",
      category: "contradiction",
      severity: question.risk_level,
      claim: question.conflict_summary ?? "Draft conflicts with approved evidence or policy.",
      detail: "Drafted answer diverges from the approved position and cannot be finalized as written.",
    });
  }

  for (const opinion of question.opinions) {
    const claimsSupport = opinion.risk_tags.includes("supported_by_evidence");
    if (opinion.evidence.length === 0 && (claimsSupport || opinion.confidence >= 0.6)) {
      findings.push({
        finding_id: `adv-unsupported-${opinion.agent_name}`,
        category: "unsupported_claim",
        severity: "high",
        claim: opinion.answer,
        detail: `${opinion.agent_name.replaceAll("_", " ")} asserts a claim with no retrieved citation backing it.`,
        hallucination_score: 0.6,
      });
    }
  }

  return findings;
}

function overallRisk(findings: AdversarialFinding[]): number {
  if (findings.length === 0) return 0.05;
  return Math.max(...findings.map((f) => f.hallucination_score ?? SEVERITY_WEIGHT[f.severity]));
}

function riskWord(score: number): string {
  if (score >= 0.7) return "High";
  if (score >= 0.4) return "Elevated";
  if (score >= 0.15) return "Low";
  return "Cleared";
}

export default function AdversarialReviewPanel({ question }: { question: RFPQuestionState }) {
  const findings = question.adversarial_findings ?? deriveFindings(question);
  const score = overallRisk(findings);

  return (
    <article className="reviewPanel adversarialPanel">
      <h3>
        <Icon name="shield" size={15} />
        Adversarial Review
        {findings.length > 0 && <span className="countPill">{findings.length}</span>}
      </h3>
      <p className="advTagline">The model that drafts the answer does not approve itself.</p>

      <div className="advScore">
        <span className="advScoreLabel">Hallucination risk</span>
        <span className="advMeter" aria-hidden>
          <span className={`advMeterFill meter-${riskWord(score).toLowerCase()}`} style={{ width: `${Math.round(score * 100)}%` }} />
        </span>
        <span className="advScoreVal">
          {riskWord(score)} · {Math.round(score * 100)}%
        </span>
      </div>

      {findings.length > 0 ? (
        <ul className="advList">
          {findings.map((f) => {
            const meta = CATEGORY_META[f.category];
            return (
              <li key={f.finding_id} className={`advItem adv-${f.category}`}>
                <div className="advItemHead">
                  <span className="advCat">
                    <Icon name={meta.icon} size={14} /> {meta.label}
                  </span>
                  <span className={`risk risk-${f.severity}`}>{f.severity}</span>
                </div>
                <p className="advClaim">“{f.claim}”</p>
                <p className="advDetail">{f.detail}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="advClear">
          <Icon name="check" size={16} />
          <p>Red team found no injection, unsupported claims, or contradictions. Answer cleared.</p>
        </div>
      )}
    </article>
  );
}
