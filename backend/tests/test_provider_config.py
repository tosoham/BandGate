from core.provider_config import load_provider_config


def test_band_urls_prefer_new_names_and_fall_back_to_legacy(monkeypatch) -> None:
    monkeypatch.delenv("BAND_REST_URL", raising=False)
    monkeypatch.delenv("BAND_WS_URL", raising=False)
    monkeypatch.setenv("THENVOI_REST_URL", "https://legacy-rest.band.ai/")
    monkeypatch.setenv("THENVOI_WS_URL", "wss://legacy-ws.band.ai/socket")

    config = load_provider_config()
    assert config.band_rest_url == "https://legacy-rest.band.ai/"
    assert config.band_ws_url == "wss://legacy-ws.band.ai/socket"

    monkeypatch.setenv("BAND_REST_URL", "https://new-rest.band.ai/")
    monkeypatch.setenv("BAND_WS_URL", "wss://new-ws.band.ai/socket")

    config = load_provider_config()
    assert config.band_rest_url == "https://new-rest.band.ai/"
    assert config.band_ws_url == "wss://new-ws.band.ai/socket"
