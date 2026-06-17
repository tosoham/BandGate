"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
};

const ROOM_KEY = (rfpId: string) => rfpId || "demo-room";

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
}: Props) {
  const [events, setEvents] = useState<BandEventRecord[]>([]);
  const [draft, setDraft] = useState("");
  const [mentions, setMentions] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionIndex, setMentionIndex] = useState(0);
  const roomId = useMemo(() => ROOM_KEY(rfpId), [rfpId]);

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
    setFeedback(ok ? "Deliberation started." : "Could not start deliberation.");
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
    setFeedback(
      `${decision.replaceAll("_", " ")}${role ? ` · ${role}` : ""} recorded${ok ? " + posted" : ""}.`,
    );
    setDraft("");
    setMentions([]);
  }

  const mentionMatches = mentionOpen
    ? ALL_AGENT_NAMES.filter((name) => {
        const label = AGENT_DISPLAY[name]?.label ?? name;
        return (
          name.toLowerCase().includes(mentionQuery) ||
          label.toLowerCase().includes(mentionQuery)
        );
      })
    : [];

  function handleDraftChange(value: string, caret: number) {
    setDraft(value);
    // Open the typeahead when the word right before the caret starts with "@"
    // (preceded by start-of-line or whitespace, so emails like a@b don't trigger).
    const match = /(?:^|\s)@([\w-]*)$/.exec(value.slice(0, caret));
    if (match) {
      setMentionQuery(match[1].toLowerCase());
      setMentionOpen(true);
      setMentionIndex(0);
    } else {
      setMentionOpen(false);
    }
  }

  function applyMention(agent: string) {
    const label = AGENT_DISPLAY[agent]?.label ?? agent;
    const caret = textareaRef.current?.selectionStart ?? draft.length;
    const before = draft.slice(0, caret).replace(/(^|\s)@([\w-]*)$/, `$1@${label} `);
    const after = draft.slice(caret);
    setDraft(before + after);
    setMentions((prev) => (prev.includes(agent) ? prev : [...prev, agent]));
    setMentionOpen(false);
    requestAnimationFrame(() => {
      const node = textareaRef.current;
      if (node) {
        node.focus();
        node.selectionStart = node.selectionEnd = before.length;
      }
    });
  }

  const lastEvent = events[events.length - 1];

  return (
    <section className="livePanel" aria-label={`Live Band room for ${questionId}`}>
      <header className="livePanelHeader">
        <div>
          <h2>Live Band Room</h2>
          <p>
            Room: <code>{roomId}</code>
            {lastEvent ? <> · last event {new Date(lastEvent.timestamp).toLocaleTimeString()}</> : null}
          </p>
        </div>
        <div className="livePanelActions">
          <button type="button" onClick={handleStartDeliberation} disabled={busy}>
            Start deliberation
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
        <div className="mentionWrap">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) =>
              handleDraftChange(e.target.value, e.target.selectionStart ?? e.target.value.length)
            }
            onKeyDown={(e) => {
              if (!mentionOpen || mentionMatches.length === 0) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setMentionIndex((i) => (i + 1) % mentionMatches.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setMentionIndex((i) => (i - 1 + mentionMatches.length) % mentionMatches.length);
              } else if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                applyMention(mentionMatches[mentionIndex]);
              } else if (e.key === "Escape") {
                setMentionOpen(false);
              }
            }}
            placeholder="Type a message, @mention an agent, then approve / push back / escalate…"
            rows={2}
          />
          {mentionOpen && mentionMatches.length > 0 ? (
            <ul className="mentionMenu" role="listbox">
              {mentionMatches.map((agent, i) => (
                <li
                  key={agent}
                  role="option"
                  aria-selected={i === mentionIndex}
                  className={i === mentionIndex ? "mentionItem mentionItemActive" : "mentionItem"}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    applyMention(agent);
                  }}
                >
                  <span
                    className="mentionDot"
                    style={{
                      backgroundColor: TONE_COLOR[AGENT_DISPLAY[agent]?.tone ?? ""] ?? "#bd5a3c",
                    }}
                  />
                  <span className="mentionName">{AGENT_DISPLAY[agent]?.label ?? agent}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {mentions.length > 0 ? (
          <div className="mentionChips">
            {mentions.map((m) => (
              <span key={m} className="mentionChip">
                @{AGENT_DISPLAY[m]?.label ?? m}
              </span>
            ))}
          </div>
        ) : null}
        <div className="gateActions">
          <button type="button" className="btn btn-ghost" onClick={sendComment} disabled={busy}>
            Comment
          </button>
          <button
            type="button"
            className="btn btn-approve"
            onClick={() => gate("approved", "Legal")}
            disabled={busy}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn btn-edit"
            onClick={() => gate("approved_with_edits", "Legal")}
            disabled={busy}
          >
            Approve w/ edits
          </button>
          <button
            type="button"
            className="btn btn-escalate"
            onClick={() => gate("escalated", "Legal")}
            disabled={busy}
          >
            Escalate
          </button>
          <button
            type="button"
            className="btn btn-escalate-sec"
            onClick={() => gate("escalated", "Security")}
            disabled={busy}
          >
            Escalate → Security
          </button>
          <button
            type="button"
            className="btn btn-reject"
            onClick={() => gate("rejected", "Legal")}
            disabled={busy}
          >
            Reject
          </button>
        </div>
        {feedback ? <p className="liveFeedback">{feedback}</p> : null}
      </footer>
    </section>
  );
}
