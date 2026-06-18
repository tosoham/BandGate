import Link from "next/link";

export default function EmptyWorkspace({ offline = false }: { offline?: boolean }) {
  return (
    <main className="emptyWorkspace">
      <section className="emptyCard">
        <p className="eyebrow">BandGate · Promise Gate</p>
        <h1>{offline ? "Backend unavailable" : "No questionnaire loaded"}</h1>
        <p className="subtitle">
          {offline
            ? "Can't reach the backend. Start it (docker compose up -d) and refresh this page."
            : "Upload an RFP questionnaire to begin a live Promise Gate review — six agents deliberate, an adversarial reviewer red-teams every claim, and you approve before any promise ships."}
        </p>
        {offline ? null : (
          <Link href="/intake" className="emptyCta">
            Go to Intake → upload a questionnaire
          </Link>
        )}
      </section>
    </main>
  );
}
