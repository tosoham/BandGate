from agents.adversarial_reviewer import red_team_answer
from core.schemas import AgentOpinion, PolicyViolation, RFPQuestionState


def _question(*, opinions: list[AgentOpinion], risk_tags: list[str] | None = None) -> RFPQuestionState:
    return RFPQuestionState(
        question_id="Q-test",
        raw_question="Can you guarantee 99.9% uptime with penalties?",
        normalized_question="Can you guarantee uptime?",
        category=["SLA"],
        risk_level="high",
        assigned_agents=["sales_engineer", "legal_commitment_guard", "adversarial_reviewer"],
        opinions=opinions,
        conflict_detected=True,
        risk_tags=risk_tags or ["sla_overcommitment"],
    )


def test_adversarial_reviewer_flags_unsupported_claims(monkeypatch) -> None:
    monkeypatch.setenv("FEATHERLESS_MODE", "mock")
    review = red_team_answer(
        _question(
            opinions=[
                AgentOpinion(
                    agent_name="sales_engineer",
                    provider="deterministic",
                    model_name="test",
                    answer="Yes, we guarantee 99.9% uptime with financial penalties.",
                    confidence=0.4,
                ),
                AgentOpinion(
                    agent_name="legal_commitment_guard",
                    provider="deterministic",
                    model_name="test",
                    answer="Use the standard 99.5% SLA language.",
                    confidence=0.9,
                    policy_violations=[
                        PolicyViolation(
                            policy_id="sla.standard",
                            severity="high",
                            claim="99.9% uptime with financial penalties",
                            allowed_position="99.5% standard SLA; 99.9% requires approval.",
                            recommended_fix="Use approved SLA wording.",
                        )
                    ],
                ),
            ]
        )
    )

    assert review.provider == "deterministic"
    assert "unsupported_claim" in review.risk_tags
    assert review.policy_violations
