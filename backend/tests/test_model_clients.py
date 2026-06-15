from core.model_clients import aiml_available, describe_model_call, featherless_available


def test_aiml_requires_explicit_enable_even_with_key(monkeypatch) -> None:
    monkeypatch.setenv("AIML_MODE", "live")
    monkeypatch.setenv("AIML_API_KEY", "test-key")
    monkeypatch.delenv("AIML_ENABLED", raising=False)

    assert aiml_available() is False
    plan = describe_model_call("aiml")
    assert plan.mode == "live"
    assert plan.live_enabled is False


def test_aiml_can_be_enabled_explicitly(monkeypatch) -> None:
    monkeypatch.setenv("AIML_MODE", "live")
    monkeypatch.setenv("AIML_API_KEY", "test-key")
    monkeypatch.setenv("AIML_ENABLED", "true")

    assert aiml_available() is True


def test_featherless_live_requires_endpoint_and_model(monkeypatch) -> None:
    monkeypatch.setenv("FEATHERLESS_MODE", "live")
    monkeypatch.setenv("FEATHERLESS_API_KEY", "test-key")
    monkeypatch.delenv("FEATHERLESS_BASE_URL", raising=False)
    monkeypatch.delenv("FEATHERLESS_MODEL", raising=False)

    assert featherless_available() is False

    monkeypatch.setenv("FEATHERLESS_BASE_URL", "https://example.test/v1")
    monkeypatch.setenv("FEATHERLESS_MODEL", "test-model")
    assert featherless_available() is True
