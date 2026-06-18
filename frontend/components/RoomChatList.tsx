"use client";

import Link from "next/link";

export type ChatItem = {
  id: string;
  question: string;
  status: string;
  risk: string;
  tags: string[];
};

type ChatState = "approved" | "critical" | "escalated" | "active" | "open";

export function chatState(item: { status: string; risk: string; tags: string[] }): ChatState {
  if (item.status === "finalized" || item.status === "approved") return "approved";
  if (item.tags.includes("prompt_injection") || item.risk === "critical") return "critical";
  if (item.status === "human_review" || item.status === "adversarial_review") return "escalated";
  if (item.status !== "open") return "active";
  return "open";
}

const STATE_LABEL: Record<ChatState, string> = {
  approved: "approved",
  critical: "critical",
  escalated: "at gate",
  active: "deliberating",
  open: "queued",
};

export default function RoomChatList({ items, activeId }: { items: ChatItem[]; activeId: string }) {
  const decided = items.filter((i) => chatState(i) === "approved").length;
  return (
    <aside className="roomChatList" aria-label="Question rooms">
      <div className="roomChatHead">
        <span>Rooms · {items.length}</span>
        <span className="roomChatDone">{decided} done</span>
      </div>
      <ul>
        {items.map((item) => {
          const state = chatState(item);
          return (
            <li key={item.id}>
              <Link
                href={`/review/${encodeURIComponent(item.id)}`}
                className={`roomChatItem state-${state}${item.id === activeId ? " isActive" : ""}`}
                aria-current={item.id === activeId ? "page" : undefined}
              >
                <span className="roomChatDot" aria-hidden />
                <span className="roomChatBody">
                  <span className="roomChatTop">
                    <span className="roomChatId">{item.id}</span>
                    <span className="roomChatBadge">{STATE_LABEL[state]}</span>
                  </span>
                  <span className="roomChatQ">{item.question}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
