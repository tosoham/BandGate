import os
from dataclasses import dataclass
from typing import Literal

ProviderMode = Literal["mock", "lite", "live"]


def _mode(name: str) -> ProviderMode:
    value = os.getenv(name, os.getenv("DEMO_MODE", "mock")).lower()
    if value not in {"mock", "lite", "live"}:
        return "mock"
    return value  # type: ignore[return-value]


@dataclass(frozen=True)
class ProviderConfig:
    band_mode: ProviderMode
    featherless_mode: ProviderMode
    aiml_mode: ProviderMode
    featherless_api_key: str | None
    aiml_api_key: str | None
    band_default_room_id: str | None
    thenvoi_rest_url: str
    thenvoi_ws_url: str


def load_provider_config() -> ProviderConfig:
    return ProviderConfig(
        band_mode=_mode("BAND_MODE"),
        featherless_mode=_mode("FEATHERLESS_MODE"),
        aiml_mode=_mode("AIML_MODE"),
        featherless_api_key=os.getenv("FEATHERLESS_API_KEY") or None,
        aiml_api_key=os.getenv("AIML_API_KEY") or None,
        band_default_room_id=os.getenv("BAND_DEFAULT_ROOM_ID") or None,
        thenvoi_rest_url=os.getenv("THENVOI_REST_URL", "https://app.band.ai/"),
        thenvoi_ws_url=os.getenv("THENVOI_WS_URL", "wss://app.band.ai/api/v1/socket/websocket"),
    )
