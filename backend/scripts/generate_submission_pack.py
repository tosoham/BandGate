import json
import os
import sys
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

sys.path.append(str(Path(__file__).resolve().parents[1]))

from core.provider_config import load_provider_config

OUTPUT_DIR = Path("output")
REPORT_PATH = OUTPUT_DIR / "submission_readiness.md"
RESULTS_PATH = OUTPUT_DIR / "submission_readiness.json"

REQUIRED_ARTIFACTS = {
    "canonical state": OUTPUT_DIR / "state.json",
    "final response": OUTPUT_DIR / "final_response.md",
    "audit trail": OUTPUT_DIR / "audit_trail.json",
    "promise ledger": OUTPUT_DIR / "promise_ledger.json",
    "Band chat report": OUTPUT_DIR / "band_chat_report.md",
    "Band transcript": OUTPUT_DIR / "band_collaboration_transcript.json",
    "hardening report": OUTPUT_DIR / "hardening_report.md",
    "hardening results": OUTPUT_DIR / "hardening_results.json",
}

EXPECTED_AGENTS = {
    "intake_agent",
    "sales_engineer",
    "security_compliance",
    "product_capability",
    "legal_commitment_guard",
    "adversarial_reviewer",
}


def _load_dotenv(path: str = ".env") -> None:
    env_path = Path(path)
    if not env_path.exists():
        return
    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def _now() -> str:
    return datetime.now(UTC).isoformat()


def build_submission_pack() -> dict[str, Any]:
    config = load_provider_config()
    artifacts = _artifact_status()
    transcript = _load_json(OUTPUT_DIR / "band_collaboration_transcript.json", [])
    hardening = _load_json(OUTPUT_DIR / "hardening_results.json", {})
    agents_seen = sorted({item.get("agent") for item in transcript if item.get("agent")})
    drift_findings = _count_transcript_drift(transcript)
    hardening_results = hardening.get("results", []) if isinstance(hardening, dict) else []
    blocked_scenarios = sum(1 for item in hardening_results if item.get("blocked"))
    provider_calls = hardening.get("provider_calls", {}) if isinstance(hardening, dict) else {}

    checks = [
        _check("All required export artifacts exist", all(item["present"] for item in artifacts), _missing_artifacts(artifacts)),
        _check(
            "All six BandGate agents appear in collaboration transcript",
            EXPECTED_AGENTS <= set(agents_seen),
            ", ".join(agents_seen) or "no transcript agents found",
        ),
        _check("Drift control produced at least one finding", drift_findings > 0, f"{drift_findings} finding(s)"),
        _check(
            "Hardening suite blocked all risky drafts",
            bool(hardening_results) and blocked_scenarios == len(hardening_results),
            f"{blocked_scenarios}/{len(hardening_results)} blocked",
        ),
        _check(
            "AI/ML API is configured for live use",
            config.aiml_enabled and config.aiml_mode == "live" and bool(config.aiml_api_key),
            f"mode={config.aiml_mode}, enabled={config.aiml_enabled}, configured={bool(config.aiml_api_key)}",
        ),
        _check(
            "Featherless is configured for live review",
            config.featherless_mode == "live" and bool(config.featherless_api_key),
            f"mode={config.featherless_mode}, configured={bool(config.featherless_api_key)}",
        ),
        _check(
            "Provider usage is visible in generated reports",
            any(int(count or 0) > 0 for count in provider_calls.values()),
            _provider_summary(provider_calls),
        ),
    ]
    ready_count = sum(1 for item in checks if item["status"] == "pass")
    return {
        "generated_at": _now(),
        "score": f"{ready_count}/{len(checks)}",
        "ready_for_draft_submission": ready_count >= 5,
        "checks": checks,
        "artifacts": artifacts,
        "agents_seen": agents_seen,
        "provider_config": {
            "band_mode": config.band_mode,
            "band_default_room_id_present": bool(config.band_default_room_id),
            "aiml_mode": config.aiml_mode,
            "aiml_enabled": config.aiml_enabled,
            "aiml_configured": bool(config.aiml_api_key),
            "aiml_model": config.aiml_model,
            "featherless_mode": config.featherless_mode,
            "featherless_configured": bool(config.featherless_api_key),
            "featherless_model": config.featherless_model,
        },
        "provider_calls": provider_calls,
        "pitch": {
            "one_liner": "BandGate is the multi-agent promise gate for cybersecurity and government RFPs.",
            "why_band": "Band makes the internal negotiation visible: agents mention each other, disagree, block risky claims, and leave a room transcript judges can inspect.",
            "why_aiml": "AI/ML powers structured intake, risky draft assist, drift support, and judge summaries while deterministic policy remains canonical.",
            "why_featherless": "Featherless acts as an independent adversarial reviewer for hallucination, unsupported-claim, prompt-injection, and sensitive-disclosure risk.",
        },
    }


def write_outputs(report: dict[str, Any]) -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)
    RESULTS_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")
    REPORT_PATH.write_text(_report_markdown(report), encoding="utf-8")


def _artifact_status() -> list[dict[str, Any]]:
    rows = []
    for label, path in REQUIRED_ARTIFACTS.items():
        rows.append(
            {
                "name": label,
                "path": str(path),
                "present": path.exists(),
                "bytes": path.stat().st_size if path.exists() else 0,
            }
        )
    return rows


def _check(name: str, passed: bool, detail: str) -> dict[str, str]:
    return {"name": name, "status": "pass" if passed else "review", "detail": detail}


def _missing_artifacts(artifacts: list[dict[str, Any]]) -> str:
    missing = [item["name"] for item in artifacts if not item["present"]]
    return "all present" if not missing else "missing: " + ", ".join(missing)


def _provider_summary(provider_calls: dict[str, Any]) -> str:
    if not provider_calls:
        return "no provider usage recorded yet"
    return ", ".join(f"{key}={value}" for key, value in sorted(provider_calls.items()))


def _count_transcript_drift(transcript: list[dict[str, Any]]) -> int:
    count = 0
    for item in transcript:
        finding = item.get("drift_finding", {})
        if isinstance(finding, dict) and finding.get("drift_detected"):
            count += 1
    return count


def _load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return default


def _report_markdown(report: dict[str, Any]) -> str:
    config = report["provider_config"]
    lines = [
        "# BandGate Submission Readiness",
        "",
        f"Generated: {report['generated_at']}",
        f"Readiness score: {report['score']}",
        f"Draft submission ready: {'yes' if report['ready_for_draft_submission'] else 'needs review'}",
        "",
        "## Judge Pitch",
        "",
        report["pitch"]["one_liner"],
        "",
        "- Band: " + report["pitch"]["why_band"],
        "- AI/ML API: " + report["pitch"]["why_aiml"],
        "- Featherless: " + report["pitch"]["why_featherless"],
        "",
        "## Readiness Checks",
        "",
    ]
    for check in report["checks"]:
        lines.append(f"- {check['status'].upper()}: {check['name']} ({check['detail']})")
    lines.extend(
        [
            "",
            "## Provider Configuration",
            "",
            f"- Band mode: {config['band_mode']}; default room configured: {config['band_default_room_id_present']}",
            f"- AI/ML mode: {config['aiml_mode']}; enabled: {config['aiml_enabled']}; key configured: {config['aiml_configured']}; model: {config['aiml_model']}",
            f"- Featherless mode: {config['featherless_mode']}; key configured: {config['featherless_configured']}; model: {config['featherless_model']}",
            "",
            "## Provider Calls Recorded",
            "",
            _provider_summary(report["provider_calls"]),
            "",
            "## Demo Artifact Map",
            "",
        ]
    )
    for artifact in report["artifacts"]:
        state = "present" if artifact["present"] else "missing"
        lines.append(f"- {artifact['name']}: {state} ({artifact['path']})")
    lines.extend(
        [
            "",
            "## Final Recording Flow",
            "",
            "1. Open the dashboard and introduce BandGate as commitment control, not generic RFP automation.",
            "2. Show the Band room/report with all six agents and the unsafe Sales draft.",
            "3. Show Legal and drift control blocking FedRAMP, SLA, prompt-injection, and artifact-disclosure risk.",
            "4. Show the hardening report with AI/ML and Featherless usage.",
            "5. End on the final answer and Promise Ledger.",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    _load_dotenv()
    report = build_submission_pack()
    write_outputs(report)
    print(f"Wrote {RESULTS_PATH}, {REPORT_PATH}, readiness_score={report['score']}")


if __name__ == "__main__":
    main()
