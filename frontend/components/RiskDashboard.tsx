import type { BandGateState, RFPQuestionState, RiskLevel } from "../lib/types";

// Severity weights used to roll individual question risk into one portfolio index.
const RISK_WEIGHT: Record<RiskLevel, number> = {
  critical: 1,
  high: 0.7,
  medium: 0.4,
  low: 0.15,
};

const RISK_ORDER: RiskLevel[] = ["critical", "high", "medium", "low"];

const STATUS_LABEL: Record<string, string> = {
  open: "Open",
  drafting: "Drafting",
  evidence_review: "Evidence review",
  policy_review: "Policy review",
  adversarial_review: "Adversarial review",
  human_review: "Human review",
  approved: "Approved",
  finalized: "Finalized",
};

function pct(value: number) {
  return `${Math.round(value * 100)}%`;
}

function indexBand(score: number): { label: string; cls: string; from: string; to: string } {
  if (score >= 0.7) return { label: "Critical exposure", cls: "ri-critical", from: "#7a2e3a", to: "#b0452f" };
  if (score >= 0.45) return { label: "Elevated exposure", cls: "ri-high", from: "#b0452f", to: "#c2683f" };
  if (score >= 0.2) return { label: "Moderate exposure", cls: "ri-medium", from: "#a9741b", to: "#c79a3a" };
  return { label: "Low exposure", cls: "ri-low", from: "#3f7d5a", to: "#6aa37f" };
}

function RiskGauge({ score }: { score: number }) {
  const r = 60;
  const circ = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, score)) * circ;
  const band = indexBand(score);
  return (
    <div className={`riskGauge ${band.cls}`} style={{ ["--halo" as string]: band.to }}>
      <svg viewBox="0 0 150 150" width="150" height="150" aria-hidden>
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={band.from} />
            <stop offset="1" stopColor={band.to} />
          </linearGradient>
        </defs>
        <circle cx="75" cy="75" r={r} fill="none" stroke="#e6dfcf" strokeWidth="9" />
        <circle
          cx="75"
          cy="75"
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 75 75)"
        />
      </svg>
      <span className="riskGaugeVal">{pct(score)}</span>
    </div>
  );
}

export default function RiskDashboard({ state }: { state: BandGateState }) {
  const questions: RFPQuestionState[] = Object.values(state.questions);
  const total = questions.length;

  const byRisk: Record<RiskLevel, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  const byStatus: Record<string, number> = {};
  let guarded = 0;
  let approved = 0;
  let attacks = 0;

  for (const q of questions) {
    byRisk[q.risk_level] = (byRisk[q.risk_level] ?? 0) + 1;
    byStatus[q.status] = (byStatus[q.status] ?? 0) + 1;
    if (q.conflict_detected) guarded += 1;
    if (q.status === "approved" || q.status === "finalized") approved += 1;
    if (q.risk_tags.includes("prompt_injection")) attacks += 1;
  }

  // Derive a portfolio index from question severities so the gauge is meaningful
  // even before the backend publishes global_risk_score.
  const derived = total > 0 ? questions.reduce((sum, q) => sum + RISK_WEIGHT[q.risk_level], 0) / total : 0;
  const score = state.global_risk_score > 0 ? state.global_risk_score : derived;

  const statusRows = Object.entries(byStatus).sort((a, b) => b[1] - a[1]);
  const maxStatus = Math.max(1, ...statusRows.map(([, n]) => n));

  return (
    <section className="riskBoard" aria-label="Risk dashboard">
      <div className="sectionTitle">
        <h2>Risk Dashboard</h2>
        <span>{total} questions · policy v{state.policy_version}</span>
      </div>

      <div className="riskGrid">
        <article className="reviewPanel riskCard riskGaugeCard">
          <RiskGauge score={score} />
          <div className="riskGaugeMeta">
            <span className="riskGaugeCap">Portfolio risk</span>
            <span className={`riskBandLabel ${indexBand(score).cls}`}>{indexBand(score).label}</span>
          </div>
          <div className="riskMini">
            <span className="riskMiniItem">
              <strong>{guarded}</strong>
              <em>guarded</em>
            </span>
            <span className="riskMiniItem">
              <strong>{approved}</strong>
              <em>approved</em>
            </span>
            <span className="riskMiniItem">
              <strong>{attacks}</strong>
              <em>attacks</em>
            </span>
          </div>
        </article>

        <article className="reviewPanel riskCard">
          <h3>Risk distribution</h3>
          <div className="riskBar" role="img" aria-label="Risk level distribution">
            {RISK_ORDER.map((level) =>
              byRisk[level] > 0 ? (
                <span
                  key={level}
                  className={`riskSeg seg-${level}`}
                  style={{ flexGrow: byRisk[level] }}
                  title={`${level}: ${byRisk[level]}`}
                />
              ) : null,
            )}
          </div>
          <ul className="riskLegend">
            {RISK_ORDER.map((level) => (
              <li key={level}>
                <span className={`legendDot seg-${level}`} />
                <span className="legendName">{level}</span>
                <span className="legendVal">{byRisk[level]}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="reviewPanel riskCard">
          <h3>Workflow status</h3>
          {statusRows.length > 0 ? (
            <ul className="statusBars">
              {statusRows.map(([status, count]) => (
                <li key={status}>
                  <div className="statusBarHead">
                    <span>{STATUS_LABEL[status] ?? status.replaceAll("_", " ")}</span>
                    <span className="statusBarVal">{count}</span>
                  </div>
                  <span className="statusTrack" aria-hidden>
                    <span className={`statusFill fill-${status}`} style={{ width: pct(count / maxStatus) }} />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="riskEmpty">No questions loaded.</p>
          )}
        </article>
      </div>
    </section>
  );
}
