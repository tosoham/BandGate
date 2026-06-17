import json

from core.band_client import BandClient, BandEvent
from core.provider_config import ProviderConfig


def test_band_client_records_lite_events(tmp_path) -> None:
    config = ProviderConfig(
        band_mode="lite",
        featherless_mode="lite",
        aiml_mode="lite",
        featherless_api_key=None,
        aiml_api_key=None,
        band_default_room_id=None,
        band_rest_url="https://app.band.ai/",
        band_ws_url="wss://app.band.ai/api/v1/socket/websocket",
    )
    client = BandClient(config=config, event_log=str(tmp_path / "band_events.jsonl"))
    record = client.post_event(
        BandEvent(
            event_type="policy_blocked",
            rfp_id="RFP-GOV-001",
            question_id="Q-001",
            agent="legal_commitment_guard",
            summary="Blocked risky SLA wording.",
            risk_level="high",
            requires_human_approval=True,
        )
    )

    assert record["provider_mode"] == "lite"
    saved = json.loads((tmp_path / "band_events.jsonl").read_text(encoding="utf-8"))
    assert saved["event_type"] == "policy_blocked"
    assert saved["requires_human_approval"] is True
