"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { uploadRfp } from "../lib/api";

export default function RfpUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "error" | "info"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [, startTransition] = useTransition();

  async function onUpload() {
    if (!file) {
      setStatus({ kind: "error", text: "Choose a CSV file first." });
      return;
    }
    setBusy(true);
    setStatus(null);
    const ok = await uploadRfp(file);
    setBusy(false);
    if (ok) {
      setStatus({ kind: "ok", text: `Uploaded ${file.name}. Reloading questions…` });
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      startTransition(() => router.refresh());
    } else {
      setStatus({ kind: "error", text: "Upload failed — is the backend running?" });
    }
  }

  return (
    <div className="uploadCard">
      <div className="uploadCopy">
        <h2>Upload a questionnaire</h2>
        <p>
          RFP CSV with columns <code>question_id, category, question</code>. It replaces the active
          set and reloads intake. Hero traps (Q-001/002/003/029) drive the demo.
        </p>
      </div>
      <div className="uploadControls">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          aria-label="RFP questionnaire CSV"
        />
        <button type="button" onClick={onUpload} disabled={busy}>
          {busy ? "Uploading…" : "Upload & reload"}
        </button>
      </div>
      {file ? <p className="uploadFile">Selected: {file.name}</p> : null}
      {status ? <p className={`uploadStatus uploadStatus-${status.kind}`}>{status.text}</p> : null}
    </div>
  );
}
