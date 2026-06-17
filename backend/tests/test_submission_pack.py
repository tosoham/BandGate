import json
from pathlib import Path

from scripts.generate_submission_pack import build_submission_pack, write_outputs


def test_submission_pack_marks_core_demo_ready(monkeypatch, tmp_path) -> None:
    monkeypatch.chdir(tmp_path)
    monkeypatch.setenv("AIML_MODE", "live")
    monkeypatch.setenv("AIML_ENABLED", "true")
    monkeypatch.setenv("AIML_API_KEY", "test-key")
    monkeypatch.setenv("FEATHERLESS_MODE", "live")
    monkeypatch.setenv("FEATHERLESS_API_KEY", "test-key")

    output = Path("output")
    output.mkdir()
    for name in [
        "state.json",
        "audit_trail.json",
        "promise_ledger.json",
        "hardening_report.md",
        "band_chat_report.md",
        "final_response.md",
    ]:
        (output / name).write_text("{}" if name.endswith(".json") else "demo", encoding="utf-8")
    (output / "band_collaboration_transcript.json").write_text(
        json.dumps(
            [
                {"agent": "intake_agent", "drift_finding": {"drift_detected": False}},
                {"agent": "sales_engineer", "drift_finding": {"drift_detected": True}},
                {"agent": "security_compliance", "drift_finding": {"drift_detected": False}},
                {"agent": "product_capability", "drift_finding": {"drift_detected": False}},
                {"agent": "legal_commitment_guard", "drift_finding": {"drift_detected": False}},
                {"agent": "adversarial_reviewer", "drift_finding": {"drift_detected": False}},
            ]
        ),
        encoding="utf-8",
    )
    (output / "hardening_results.json").write_text(
        json.dumps(
            {
                "provider_calls": {"aiml_sales_draft": 1, "featherless_review": 1},
                "results": [{"blocked": True}, {"blocked": True}],
            }
        ),
        encoding="utf-8",
    )

    report = build_submission_pack()
    write_outputs(report)

    assert report["ready_for_draft_submission"] is True
    assert report["score"] == "7/7"
    assert (output / "submission_readiness.md").exists()
    assert "BandGate Submission Readiness" in (output / "submission_readiness.md").read_text(encoding="utf-8")
