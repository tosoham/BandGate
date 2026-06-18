"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../../components/Logo";

const AGENTS = [
  { initial: "S", label: "Sales" },
  { initial: "Se", label: "Security" },
  { initial: "P", label: "Product" },
  { initial: "L", label: "Legal" },
  { initial: "I", label: "Intake" },
  { initial: "A", label: "Adversarial" },
];

export default function LoginPage() {
  const router = useRouter();
  const [org, setOrg] = useState("demo");
  const [email, setEmail] = useState("agnik@bandgate.test");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ org_slug: org.trim(), email: email.trim() }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? "login failed");
        setPending(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("network error");
      setPending(false);
    }
  }

  return (
    <main className="authShell">
      <div className="authGrid">
        <aside className="authBrand">
          <div className="authBrandTop">
            <span className="authMark" aria-hidden>
              <Logo size={20} />
            </span>
            <span className="authWordmark">BandGate</span>
          </div>

          <div className="authPitch">
            <p className="authEyebrow">The Promise Gate</p>
            <h1>The promise gate for every RFP commitment.</h1>
            <p className="authLede">
              Six AI agents deliberate live, an adversarial reviewer red-teams every
              claim, and a human approves before a single promise ships.
            </p>
          </div>

          <div className="authAgents">
            <span className="authAgentsLabel">The room</span>
            <ul>
              {AGENTS.map((a) => (
                <li key={a.label} title={a.label}>
                  <span className="authAvatar">{a.initial}</span>
                  {a.label}
                </li>
              ))}
            </ul>
          </div>

          <p className="authFootnote">
            AI/ML proposes · deterministic policy disposes — every answer gated to
            approved evidence.
          </p>
        </aside>

        <section className="authPanel">
          <header className="authPanelHead">
            <h2>Sign in</h2>
            <p>Access your organization to start a Promise Gate review.</p>
          </header>

          <form onSubmit={submit} className="authForm">
            <label>
              <span>Organization slug</span>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                autoComplete="organization"
                autoFocus
                required
              />
            </label>
            <label>
              <span>Work email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <button type="submit" disabled={pending}>
              {pending ? "Signing in…" : "Continue →"}
            </button>
            {error ? (
              <p className="authError" role="alert">
                {error}
              </p>
            ) : null}
          </form>

          <div className="authDemoHint">
            <span className="authDemoBadge">Demo</span>
            Use org <strong>demo</strong> with any email to enter.
          </div>
        </section>
      </div>
    </main>
  );
}
