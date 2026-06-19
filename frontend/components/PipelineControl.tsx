"use client";

import { useEffect, useState } from "react";

// Live pipeline control in the header: a prominent Stop button (so you can halt
// deliberation and stop burning AI/ML + Featherless credits), plus a Start when
// idle with questions loaded. Polls /pipeline/status to stay in sync.
export default function PipelineControl({ publicBackendUrl }: { publicBackendUrl: string }) {
  const base = (publicBackendUrl ?? "").replace(/\/+$/, "");
  const [running, setRunning] = useState(false);
  const [questions, setQuestions] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!base) return;
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetch(`${base}/pipeline/status`, { cache: "no-store" });
        if (!res.ok || !alive) return;
        const data = (await res.json()) as { running?: boolean; questions?: number };
        if (!alive) return;
        setRunning(Boolean(data.running));
        setQuestions(data.questions ?? 0);
      } catch {
        /* transient */
      }
    };
    tick();
    const id = setInterval(tick, 3000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [base]);

  async function post(path: string, optimistic: boolean) {
    setBusy(true);
    try {
      await fetch(`${base}${path}`, { method: "POST" });
    } catch {
      /* ignore */
    }
    setRunning(optimistic);
    setBusy(false);
  }

  if (!base) return null;

  if (running) {
    return (
      <button
        type="button"
        className="pipelineBtn pipelineBtn-stop"
        onClick={() => post("/pipeline/stop", false)}
        disabled={busy}
        title="Stop the deliberation pipeline (halts AI/ML calls)"
      >
        <span className="pipelineDot" aria-hidden />
        {busy ? "Stopping…" : `Stop pipeline${questions ? ` · ${questions}` : ""}`}
      </button>
    );
  }

  if (questions > 0) {
    return (
      <button
        type="button"
        className="pipelineBtn pipelineBtn-start"
        onClick={() => post("/pipeline/start", true)}
        disabled={busy}
        title="Run the deliberation pipeline across all loaded questions"
      >
        {busy ? "Starting…" : "Start pipeline"}
      </button>
    );
  }

  return null;
}
