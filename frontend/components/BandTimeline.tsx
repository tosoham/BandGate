import type { RFPQuestionState } from "../lib/types";

type BandEvent = {
  id: string;
  type: "assignment" | "output" | "adversarial" | "block" | "approval" | "final";
  title: string;
  detail: string;
  tag?: string;
};

function agentLabel(name: string) {
  return name.replaceAll("_", " ");
}

function buildEvents(question: RFPQuestionState): BandEvent[] {
  const events: BandEvent[] = [];

  events.push({
    id: "open",
    type: "assignment",
    title: "Room opened",
    detail: `Assigned: ${question.assigned_agents.map(agentLabel).join(", ")}`,
  });

  question.opinions.forEach((opinion, i) => {
    events.push({
      id: `op-${i}`,
      type: "output",
      title: `${agentLabel(opinion.agent_name)} posted`,
      detail: opinion.answer,
      tag: opinion.provider === "aiml" ? "AI/ML API" : "deterministic",
    });
  });

  if (question.risk_tags.includes("prompt_injection")) {
    events.push({
      id: "adv",
      type: "adversarial",
      title: "Adversarial Reviewer",
      detail: "Prompt injection detected — buyer text quarantined as untrusted input.",
    });
  } else if (question.conflict_detected) {
    events.push({
      id: "block",
      type: "block",
      title: "Commitment Guard · policy block",
      detail: question.conflict_summary ?? "Draft conflicts with approved policy.",
    });
  }

  question.approvals.forEach((approval, i) => {
    events.push({
      id: `appr-${i}`,
      type: "approval",
      title: `${approval.approver_role} · ${approval.decision.replaceAll("_", " ")}`,
      detail: approval.comment ?? "Human approval recorded.",
    });
  });

  if (question.status === "approved" && question.final_answer) {
    events.push({
      id: "final",
      type: "final",
      title: "Final answer recorded",
      detail: question.final_answer,
    });
  }

  return events;
}

export default function BandTimeline({ question }: { question: RFPQuestionState }) {
  const events = buildEvents(question);

  return (
    <article className="reviewPanel">
      <h3>
        <span className="bandDot" aria-hidden /> Band Event Stream
      </h3>
      <ul className="bandLog">
        {events.map((event) => (
          <li key={event.id} className={`bandEvent be-${event.type}`}>
            <span className="bandNode" aria-hidden />
            <div className="bandBody">
              <div className="bandHead">
                <span className="bandTitle">{event.title}</span>
                {event.tag && <span className="bandTag">{event.tag}</span>}
              </div>
              <p className="bandDetail">{event.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
