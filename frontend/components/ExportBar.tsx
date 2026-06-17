"use client";

import type { BandGateState, RFPQuestionState } from "../lib/types";

function download(filename: string, mime: string, contents: string) {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value: string | boolean): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function finalResponsesMarkdown(state: BandGateState): string {
  const lines: string[] = [
    `# ${state.vendor_name} — RFP Response`,
    "",
    `**Buyer:** ${state.buyer_name}  `,
    `**RFP:** ${state.rfp_id}  `,
    `**Policy version:** ${state.policy_version}`,
    "",
    "---",
    "",
  ];
  const questions = Object.values(state.questions);
  for (const q of questions) {
    lines.push(`## ${q.question_id} · ${q.raw_question}`, "");
    lines.push(`- **Risk:** ${q.risk_level}`);
    lines.push(`- **Status:** ${q.status.replaceAll("_", " ")}`);
    if (q.conflict_detected && q.conflict_summary) {
      lines.push(`- **Policy note:** ${q.conflict_summary}`);
    }
    lines.push("", q.final_answer ?? "_No approved final answer yet — pending human sign-off._", "");
  }
  return lines.join("\n");
}

function auditTrailJson(state: BandGateState): string {
  return JSON.stringify(
    {
      rfp_id: state.rfp_id,
      policy_version: state.policy_version,
      exported_questions: Object.keys(state.questions).length,
      audit_trail: state.audit_trail,
    },
    null,
    2,
  );
}

function ledgerCsv(state: BandGateState): string {
  const header = [
    "commitment_id",
    "source_question_id",
    "commitment_text",
    "owner_department",
    "delivery_action",
    "due_stage",
    "approval_required",
  ];
  const rows = state.promise_ledger.map((e) =>
    [
      e.commitment_id,
      e.source_question_id,
      e.commitment_text,
      e.owner_department,
      e.delivery_action,
      e.due_stage,
      e.approval_required,
    ]
      .map(csvCell)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

function approvedCount(state: BandGateState): number {
  return (Object.values(state.questions) as RFPQuestionState[]).filter(
    (q) => q.status === "approved" || q.status === "finalized",
  ).length;
}

export default function ExportBar({ state }: { state: BandGateState }) {
  const totalQ = Object.keys(state.questions).length;
  const approved = approvedCount(state);

  return (
    <section className="exportBar reviewPanel" aria-label="Export & download">
      <div className="exportHead">
        <h3>Export &amp; Download</h3>
        <p>Generate the response package, audit trail, and Promise Ledger from current state.</p>
      </div>
      <div className="exportActions">
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => download(`${state.rfp_id}-responses.md`, "text/markdown", finalResponsesMarkdown(state))}
        >
          Final responses
          <span className="exportMeta">{approved}/{totalQ} approved · .md</span>
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => download(`${state.rfp_id}-audit.json`, "application/json", auditTrailJson(state))}
        >
          Audit trail
          <span className="exportMeta">{state.audit_trail.length} events · .json</span>
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => download(`${state.rfp_id}-promise-ledger.csv`, "text/csv", ledgerCsv(state))}
        >
          Promise Ledger
          <span className="exportMeta">{state.promise_ledger.length} entries · .csv</span>
        </button>
      </div>
    </section>
  );
}
