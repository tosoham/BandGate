"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Icon from "./Icon";
import { ALL_AGENT_NAMES, postHumanMessage, startDeliberation } from "../lib/api";
import { subscribeToRoom } from "../lib/sse";
import type { BandEventRecord, HumanGateAction } from "../lib/types";

type GateDecision = "approved" | "approved_with_edits" | "rejected" | "escalated";

type Props = {
  questionId: string;
  rfpId: string;
  publicBackendUrl: string;
  onDecide?: (decision: GateDecision, role: string, finalAnswer?: string) => void;
  recommended?: string;
  initialStatus?: string;
};

// A question that has already reached one of these statuses has a recorded
// human decision — the gate buttons lock so the same call can't be made twice.
function decisionFromStatus(status?: string): GateDecision | null {
  if (status === "finalized" || status === "approved") return "approved";
  if (status === "rejected") return "rejected";
  return null;
}

const ROOM_KEY = (rfpId: string) => rfpId || "demo-room";

// You ARE the human gate — only the AI agents are mentionable.
const MENTIONABLE_AGENTS = ALL_AGENT_NAMES.filter((name) => name !== "human_gate");

const AGENT_DISPLAY: Record<string, { label: string; tone: string }> = {
  intake_agent: { label: "Intake Agent", tone: "agent-blue" },
  sales_engineer: { label: "Sales Engineer", tone: "agent-yellow" },
  security_compliance: { label: "Security & Compliance", tone: "agent-green" },
  product_capability: { label: "Product Capability", tone: "agent-purple" },
  legal_commitment_guard: { label: "Legal / Commitment Guard", tone: "agent-red" },
  adversarial_reviewer: { label: "Adversarial Reviewer", tone: "agent-orange" },
  human_gate: { label: "Human Gate", tone: "agent-black" },
  orchestrator: { label: "Orchestrator", tone: "agent-grey" },
};

const TONE_COLOR: Record<string, string> = {
  "agent-blue": "#3f6f9e",
  "agent-yellow": "#ac7a26",
  "agent-green": "#3f7a5c",
  "agent-purple": "#6b4f8a",
  "agent-red": "#bd5a3c",
  "agent-orange": "#c2702a",
  "agent-black": "#423f38",
  "agent-grey": "#a39e91",
};

export default function LiveRoomPanel({
  questionId,
  rfpId,
  publicBackendUrl,
  onDecide,
  recommended,
  initialStatus,
}: Props) {
  const [events, setEvents] = useState<BandEventRecord[]>([]);
  const [draft, setDraft] = useState("");
  const [mentions, setMentions] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  // Terminal human decision for this question — locks the gate to prevent
  // double-approve. Seeded from server status, then set when you decide here.
  const [decided, setDecided] = useState<GateDecision | null>(decisionFromStatus(initialStatus));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mentionRef = useRef<HTMLDivElement | null>(null);
  const [mentionOpen, setMentionOpen] = useState(false);
  const roomId = useMemo(() => ROOM_KEY(rfpId), [rfpId]);

  function toggleMention(agent: string) {
    setMentions((prev) => (prev.includes(agent) ? prev.filter((a) => a !== agent) : [...prev, agent]));
  }

  // Close the mention dropdown when clicking outside of it.
  useEffect(() => {
    if (!mentionOpen) return;
    function onClick(e: MouseEvent) {
      if (mentionRef.current && !mentionRef.current.contains(e.target as Node)) {
        setMentionOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mentionOpen]);

  useEffect(() => {
    if (!publicBackendUrl) return;
    const subscription = subscribeToRoom(publicBackendUrl, roomId, questionId, (event) => {
      setEvents((prev) => {
        const next = [...prev, event];
        if (next.length > 400) next.splice(0, next.length - 400);
        return next;
      });
    });
    return () => subscription.close();
  }, [publicBackendUrl, roomId, questionId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [events.length]);

  async function handleStartDeliberation() {
    setBusy(true);
    setFeedback(null);
    const ok = await startDeliberation(questionId);
    if (ok) {
      // A fresh round re-opens the question: unlock the gate so you can decide
      // again after the agents talk (rebuttals included).
      setDecided(null);
      setFeedback(decided ? "New round started — agents are re-deliberating." : "Deliberation started.");
    } else {
      setFeedback("Could not start deliberation.");
    }
    setBusy(false);
  }

  async function sendComment() {
    if (!draft.trim()) {
      setFeedback("Type a comment first.");
      return;
    }
    setBusy(true);
    setFeedback(null);
    const ok = await postHumanMessage(roomId, {
      question_id: questionId,
      content: draft.trim(),
      action: "comment",
      mentions,
    });
    setBusy(false);
    setFeedback(ok ? "Comment posted to room." : "Send failed.");
    if (ok) {
      setDraft("");
      setMentions([]);
    }
  }

  const GATE_ACTION: Record<GateDecision, HumanGateAction> = {
    approved: "approve",
    approved_with_edits: "approve_with_edits",
    escalated: "escalate",
    rejected: "reject",
  };

  async function gate(decision: GateDecision, role: string) {
    const finalAnswer =
      decision === "approved_with_edits"
        ? draft.trim() || recommended
        : decision === "approved"
          ? recommended
          : undefined;
    // 1) record the authoritative decision (Promise Ledger + audit) when wired in
    onDecide?.(decision, role, finalAnswer);
    // 2) reflect the same action in the live room transcript
    setBusy(true);
    setFeedback(null);
    const ok = await postHumanMessage(roomId, {
      question_id: questionId,
      content: draft.trim() || `${decision.replaceAll("_", " ")} · ${role}`,
      action: GATE_ACTION[decision],
      mentions,
      approver_role: role,
      final_answer: finalAnswer,
    });
    setBusy(false);
    if (ok) setDecided(decision);
    setFeedback(
      `${decision.replaceAll("_", " ")}${role ? ` · ${role}` : ""} recorded${ok ? " + posted" : ""}.`,
    );
    setDraft("");
    setMentions([]);
  }

  const locked = decided !== null;

  const lastEvent = events[events.length - 1];

  return (
    <section className="livePanel" aria-label={`Live Band room for ${questionId}`}>
      <header className="livePanelHeader">
        <div>
          <h2>Live Band Room</h2>
          <p>
            Room: <code>{roomId}</code>
            {lastEvent ? <> · last event <span suppressHydrationWarning>{new Date(lastEvent.timestamp).toLocaleTimeString()}</span></> : null}
          </p>
        </div>
        <div className="livePanelActions">
          <button type="button" onClick={handleStartDeliberation} disabled={busy}>
            {decided ? "New round of deliberation" : "Start deliberation"}
          </button>
        </div>
      </header>
      <div className="liveStream" ref={containerRef}>
        {events.length === 0 ? (
          <p className="liveEmpty">
            No events yet. Click <strong>Start deliberation</strong> to kick off the six-agent room.
          </p>
        ) : (
          events.map((event, index) => (
            <article
              key={`${event.timestamp}-${index}-${event.agent}`}
              className={`liveTurn ${AGENT_DISPLAY[event.agent]?.tone ?? "agent-grey"}`}
            >
              <header>
                <span className="liveAgent">
                  {AGENT_DISPLAY[event.agent]?.label ?? event.agent}
                </span>
                <span className="liveMeta">
                  {event.event_type.replaceAll("_", " ")}
                  {event.payload && typeof event.payload === "object" && "round_no" in event.payload
                    ? ` · round ${(event.payload as { round_no?: number }).round_no}`
                    : ""}
                </span>
              </header>
              <p>{event.summary}</p>
              {event.payload && typeof event.payload === "object" && "mentions" in event.payload ? (
                <small>
                  →{" "}
                  {((event.payload as { mentions?: string[] }).mentions ?? []).join(", ") || "no mentions"}
                </small>
              ) : null}
            </article>
          ))
        )}
      </div>
      <footer className="liveComposer">
        <textarea
          className="composerInput"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message to the room, tag the agents you want to reach, then approve / push back / escalate…"
          rows={2}
        />

        <div className="mentionBar" ref={mentionRef}>
          <button
            type="button"
            className={`mentionToggle${mentionOpen ? " mentionToggleOpen" : ""}`}
            aria-expanded={mentionOpen}
            onClick={() => setMentionOpen((o) => !o)}
          >
            <span className="mentionToggleAt">@</span>
            Tag agents
            {mentions.length > 0 ? <span className="mentionCount">{mentions.length}</span> : null}
            <span className="mentionCaret" aria-hidden>
              ▾
            </span>
          </button>

          {mentions.length > 0 ? (
            <div className="mentionChips">
              {mentions.map((m) => (
                <button
                  key={m}
                  type="button"
                  className="mentionChip"
                  onClick={() => toggleMention(m)}
                  title="Remove mention"
                >
                  <span
                    className="mentionDot"
                    style={{ backgroundColor: TONE_COLOR[AGENT_DISPLAY[m]?.tone ?? ""] ?? "#bd5a3c" }}
                  />
                  {AGENT_DISPLAY[m]?.label ?? m}
                  <span className="mentionChipX" aria-hidden>
                    ×
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {mentionOpen ? (
            <div className="mentionPop" role="listbox" aria-label="Tag agents">
              <span className="mentionPopHead">Tap to tag · tap again to remove</span>
              <div className="mentionTagGrid">
                {MENTIONABLE_AGENTS.map((agent) => {
                  const selected = mentions.includes(agent);
                  return (
                    <button
                      key={agent}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`mentionTag${selected ? " mentionTagSelected" : ""}`}
                      onClick={() => toggleMention(agent)}
                    >
                      <span
                        className="mentionDot"
                        style={{
                          backgroundColor: TONE_COLOR[AGENT_DISPLAY[agent]?.tone ?? ""] ?? "#bd5a3c",
                        }}
                      />
                      {AGENT_DISPLAY[agent]?.label ?? agent}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="gateBar">
          <button
            type="button"
            className="gateBtn gateBtn-comment"
            onClick={sendComment}
            disabled={busy}
          >
            <Icon name="review" size={15} />
            Post comment
          </button>
          <div className="gateDecisions">
            <button
              type="button"
              className="gateBtn gateBtn-approve"
              onClick={() => gate("approved", "Legal")}
              disabled={busy || locked}
            >
              <Icon name="approve" size={15} />
              Approve
            </button>
            <button
              type="button"
              className="gateBtn gateBtn-edit"
              onClick={() => gate("approved_with_edits", "Legal")}
              disabled={busy || locked}
            >
              <Icon name="check" size={15} />
              Approve with edits
            </button>
            <button
              type="button"
              className="gateBtn gateBtn-escalate"
              onClick={() => gate("escalated", "Legal")}
              disabled={busy || locked}
            >
              <Icon name="flag" size={15} />
              Escalate
            </button>
            <button
              type="button"
              className="gateBtn gateBtn-escalate-sec"
              onClick={() => gate("escalated", "Security")}
              disabled={busy || locked}
            >
              <Icon name="shield" size={15} />
              Escalate → Security
            </button>
            <button
              type="button"
              className="gateBtn gateBtn-reject"
              onClick={() => gate("rejected", "Legal")}
              disabled={busy || locked}
            >
              <Icon name="block" size={15} />
              Reject
            </button>
          </div>
        </div>
        {decided ? (
          <p className={`gateDecided gateDecided-${decided}`}>
            <span className="gateDecidedDot" aria-hidden />
            Decision recorded: <strong>{decided.replaceAll("_", " ")}</strong> — gate locked (no double-submit).
          </p>
        ) : null}
        {feedback ? <p className="liveFeedback">{feedback}</p> : null}
      </footer>
    </section>
  );
}
