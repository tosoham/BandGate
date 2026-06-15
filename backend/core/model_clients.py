from dataclasses import dataclass
from typing import Literal

from core.provider_config import ProviderConfig, load_provider_config

ModelProvider = Literal["aiml", "featherless"]


@dataclass(frozen=True)
class ModelCallPlan:
    provider: ModelProvider
    mode: str
    live_enabled: bool
    fallback: str


def describe_model_call(provider: ModelProvider, config: ProviderConfig | None = None) -> ModelCallPlan:
    loaded = config or load_provider_config()
    mode = loaded.aiml_mode if provider == "aiml" else loaded.featherless_mode
    key = loaded.aiml_api_key if provider == "aiml" else loaded.featherless_api_key
    return ModelCallPlan(
        provider=provider,
        mode=mode,
        live_enabled=mode == "live" and bool(key),
        fallback="deterministic_local_guardrails",
    )
