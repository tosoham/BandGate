import Dashboard from "../components/Dashboard";
import { mockState } from "../lib/mockState";
import type { BandEventRecord, BandGateState } from "../lib/types";

type StateSource = "live" | "fallback" | "demo";

function backendBaseUrl() {
  return process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
}

async function loadState(): Promise<{ state: BandGateState; source: StateSource }> {
  const baseUrl = backendBaseUrl();
  if (!baseUrl) {
    return { state: mockState, source: "demo" };
  }
  try {
    const response = await fetch(`${baseUrl}/state`, { cache: "no-store" });
    if (!response.ok) {
      return { state: mockState, source: "fallback" };
    }
    return { state: (await response.json()) as BandGateState, source: "live" };
  } catch {
    return { state: mockState, source: "fallback" };
  }
}

async function loadBandEvents(): Promise<BandEventRecord[]> {
  const baseUrl = backendBaseUrl();
  if (!baseUrl) {
    return [];
  }
  try {
    const response = await fetch(`${baseUrl}/band/events`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    return (await response.json()) as BandEventRecord[];
  } catch {
    return [];
  }
}

async function loadBandReport(): Promise<string> {
  const baseUrl = backendBaseUrl();
  if (!baseUrl) {
    return "";
  }
  try {
    const response = await fetch(`${baseUrl}/exports/band-chat-report`, { cache: "no-store" });
    if (!response.ok) {
      return "";
    }
    const text = await response.text();
    // The endpoint returns a JSON {"detail": ...} when the report isn't generated yet.
    return text.trimStart().startsWith("{") ? "" : text;
  } catch {
    return "";
  }
}

export default async function Home() {
  const [{ state, source }, bandEvents, bandReport] = await Promise.all([
    loadState(),
    loadBandEvents(),
    loadBandReport(),
  ]);
  return (
    <Dashboard
      state={state}
      source={source}
      bandEvents={bandEvents}
      bandReport={bandReport}
      publicBackendUrl={process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}
    />
  );
}
