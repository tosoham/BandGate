import json
from dataclasses import asdict, dataclass
from datetime import UTC, datetime
from pathlib import Path
from typing import Any, Literal

from core.provider_config import ProviderConfig, load_provider_config

BandEventType = Literal[
    "assignment",
    "agent_output",
    "policy_blocked",
    "adversarial_finding",
    "human_approval",
    "final_export",
]


@dataclass(frozen=True)
class BandEvent:
    event_type: BandEventType
    rfp_id: str
    question_id: str | None
    agent: str
    summary: str
    risk_level: str | None = None
    requires_human_approval: bool = False
    payload: dict[str, Any] | None = None
    timestamp: str = ""

    def to_record(self) -> dict[str, Any]:
        record = asdict(self)
        record["timestamp"] = self.timestamp or datetime.now(UTC).isoformat()
        return record


class BandClient:
    """Band integration seam.

    Band SDK docs use the `band-sdk` package and `band` module. Live agents
    should be created as Remote Agents on the Band platform, with per-agent
    credentials stored in agent_config.yaml. Mock/lite mode records the same
    event payloads locally so the demo remains deterministic.
    """

    def __init__(self, config: ProviderConfig | None = None, event_log: str = "output/band_events.jsonl") -> None:
        self.config = config or load_provider_config()
        self.event_log = Path(event_log)

    def post_event(self, event: BandEvent) -> dict[str, Any]:
        if self.config.band_mode in {"mock", "lite"}:
            return self._write_local_event(event)

        raise NotImplementedError(
            "Live Band SDK mode should run each Remote Agent with band-sdk/band "
            "using agent_config.yaml credentials and BAND_REST_URL/BAND_WS_URL."
        )

    def _write_local_event(self, event: BandEvent) -> dict[str, Any]:
        self.event_log.parent.mkdir(parents=True, exist_ok=True)
        record = event.to_record()
        record["provider_mode"] = self.config.band_mode
        self.event_log.open("a", encoding="utf-8").write(json.dumps(record) + "\n")
        return record
