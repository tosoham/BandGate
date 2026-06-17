import Icon from "./Icon";
import type { BandGateState, PromiseLedgerEntry } from "../lib/types";

const STAGE_LABEL: Record<PromiseLedgerEntry["due_stage"], string> = {
  pre_contract: "Pre-contract",
  contracting: "Contracting",
  implementation: "Implementation",
  onboarding: "Onboarding",
  renewal: "Renewal",
};

export default function PromiseLedger({ state }: { state: BandGateState }) {
  const entries = state.promise_ledger;

  return (
    <section className="ledgerBoard" aria-label="Promise Ledger">
      <div className="sectionTitle">
        <h2>Promise Ledger</h2>
        <span>{entries.length} commitments</span>
      </div>

      <article className="reviewPanel ledgerPanel">
        {entries.length > 0 ? (
          <div className="ledgerScroll">
            <table className="ledgerTable">
              <thead>
                <tr>
                  <th>Commitment</th>
                  <th>Owner</th>
                  <th>Delivery action</th>
                  <th>Due stage</th>
                  <th>Approval</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.commitment_id}>
                    <td className="ledgerCommit">{e.commitment_text}</td>
                    <td>
                      <span className={`ownerTag owner-${e.owner_department.toLowerCase().replace(/\s+/g, "-")}`}>
                        {e.owner_department}
                      </span>
                    </td>
                    <td className="ledgerAction">{e.delivery_action}</td>
                    <td>
                      <span className="stageTag">{STAGE_LABEL[e.due_stage]}</span>
                    </td>
                    <td>
                      {e.approval_required ? (
                        <span className="approvalYes">Required</span>
                      ) : (
                        <span className="approvalNo">Not required</span>
                      )}
                    </td>
                    <td className="ledgerSource">{e.source_question_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="ledgerEmpty">
            <Icon name="ledger" size={26} />
            <p>
              No commitments recorded yet. As answers are approved, every binding promise (SLAs, certifications,
              data-handling obligations) is logged here with its owner and delivery stage.
            </p>
          </div>
        )}
      </article>
    </section>
  );
}
