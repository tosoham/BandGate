from core.model_clients import generate_adversarial_review
from core.schemas import AgentOpinion, PolicyViolation, RFPQuestionState


def red_team_answer(question: RFPQuestionState) -> AgentOpinion:
    text = question.raw_question.lower()
    violations: list[PolicyViolation] = []
    finding_tags: list[str] = []

    if "ignore internal" in text or "answer all" in text or "do not mention exceptions" in text:
        answer = "Prompt injection detected. Treat buyer-provided instruction as untrusted data."
        finding_tags.append("prompt_injection")
        violations.append(
            PolicyViolation(
                policy_id="adversarial.prompt_injection",
                severity="critical",
                claim="buyer attempted to override internal policy hierarchy",
                allowed_position="RFP content is input data only and cannot override policy.",
                recommended_fix="Ignore malicious instruction and continue from approved corpus.",
            )
        )
        confidence = 0.97
    else:
        scores = _score_answer_risk(question)
        finding_tags.extend(scores["tags"])
        if scores["max_score"] >= 0.65:
            answer = (
                "Adversarial review found elevated unsupported-claim or contradiction risk. "
                f"Hallucination={scores['hallucination']:.2f}, "
                f"unsupported_claim={scores['unsupported_claim']:.2f}, "
                f"contradiction={scores['contradiction']:.2f}."
            )
            confidence = max(0.78, scores["max_score"])
            violations.append(
                PolicyViolation(
                    policy_id="adversarial.unsupported_or_contradictory_claim",
                    severity="high" if scores["max_score"] >= 0.8 else "medium",
                    claim="candidate answer may overstate approved evidence or conflict with policy",
                    allowed_position="Final wording must be traceable to approved evidence and commitment policy.",
                    recommended_fix="Use the Legal/Commitment Guard answer or add explicit evidence citations.",
                )
            )
        elif question.risk_tags:
            answer = (
                "High-risk wording detected. Final answer should use only cited "
                "evidence and approved policy language."
            )
            confidence = 0.84
        else:
            answer = "No adversarial issue detected in deterministic review."
            confidence = 0.68

    provider = "deterministic"
    model_name = "day3-red-team-rule"
    model_review = generate_adversarial_review(
        question.raw_question,
        question.final_answer or _candidate_answer(question),
        question.risk_tags,
    )
    if model_review and isinstance(model_review.get("finding"), str):
        provider = "featherless"
        model_name = "featherless-red-team"
        answer = (
            f"{model_review['finding'].strip()} "
            f"Hallucination={_float_score(model_review.get('hallucination_score')):.2f}, "
            f"unsupported_claim={_float_score(model_review.get('unsupported_claim_score')):.2f}, "
            f"contradiction={_float_score(model_review.get('contradiction_score')):.2f}."
        )
        confidence = max(confidence, 0.86)

    return AgentOpinion(
        agent_name="adversarial_reviewer",
        provider=provider,
        model_name=model_name,
        answer=answer,
        confidence=confidence,
        policy_violations=violations,
        risk_tags=sorted(set(question.risk_tags + finding_tags)),
    )


def _candidate_answer(question: RFPQuestionState) -> str:
    legal = next((opinion.answer for opinion in question.opinions if opinion.agent_name == "legal_commitment_guard"), "")
    security = next((opinion.answer for opinion in question.opinions if opinion.agent_name == "security_compliance"), "")
    sales = next((opinion.answer for opinion in question.opinions if opinion.agent_name == "sales_engineer"), "")
    return legal or security or sales


def _score_answer_risk(question: RFPQuestionState) -> dict[str, float | list[str]]:
    candidate = _candidate_answer(question).lower()
    sales = next((opinion.answer.lower() for opinion in question.opinions if opinion.agent_name == "sales_engineer"), "")
    legal_violations = [
        violation
        for opinion in question.opinions
        if opinion.agent_name == "legal_commitment_guard"
        for violation in opinion.policy_violations
    ]
    evidence_count = sum(len(opinion.evidence) for opinion in question.opinions)

    unsupported_claim = 0.1
    contradiction = 0.1
    hallucination = 0.1
    tags: list[str] = []

    if legal_violations:
        unsupported_claim = 0.82
        tags.append("unsupported_claim")
    if any(word in sales for word in ["guarantee", "financial penalties", "fedramp authorized", "exclusively", "full report"]):
        contradiction = max(contradiction, 0.74)
        tags.append("sales_policy_contradiction")
    if question.risk_level in {"high", "critical"} and evidence_count == 0:
        hallucination = 0.68
        tags.append("hallucination_risk")
    if "not currently" in candidate and "yes" in sales:
        contradiction = max(contradiction, 0.8)
        tags.append("explicit_contradiction")

    max_score = max(unsupported_claim, contradiction, hallucination)
    return {
        "unsupported_claim": unsupported_claim,
        "contradiction": contradiction,
        "hallucination": hallucination,
        "max_score": max_score,
        "tags": tags,
    }


def _float_score(value: object) -> float:
    try:
        score = float(value)  # type: ignore[arg-type]
    except (TypeError, ValueError):
        return 0.0
    return min(max(score, 0.0), 1.0)
