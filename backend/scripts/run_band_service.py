import os
import sys
import time
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from core.band_sdk_runtime import EXPECTED_BAND_AGENTS, validate_band_agent_config
from core.provider_config import load_provider_config


def _count_events(path: Path) -> int:
    if not path.exists():
        return 0
    return sum(1 for line in path.read_text(encoding="utf-8").splitlines() if line.strip())


def main() -> None:
    config = load_provider_config()
    statuses = validate_band_agent_config()
    configured = ", ".join(status.name for status in statuses)
    print(f"BandGate Band service starting in {config.band_mode} mode.")
    print(f"Configured remote agents: {configured}")

    if config.band_mode == "live" and os.getenv("BAND_SERVICE_LIVE", "false").lower() != "true":
        raise SystemExit(
            "BAND_MODE=live is set, but live WebSocket agents are intentionally gated. "
            "Run scripts/verify_band_agents.py with BAND_VERIFY_LIVE=true after installing "
            "band-sdk[langgraph] and configuring an approved LLM provider."
        )

    if os.getenv("BAND_SERVICE_ONCE", "false").lower() == "true":
        return

    interval = float(os.getenv("BAND_SERVICE_HEARTBEAT_SECONDS", "30"))
    event_log = Path("output/band_events.jsonl")
    print("Watching local Band event stream at output/band_events.jsonl. Press Ctrl+C to stop.")
    while True:
        count = _count_events(event_log)
        print(
            f"Band service heartbeat: {count} local events, "
            f"{len(EXPECTED_BAND_AGENTS)} expected agents, room={config.band_default_room_id or 'not-set'}"
        )
        time.sleep(interval)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Band service stopped.")
