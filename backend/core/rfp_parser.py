import csv
from dataclasses import dataclass

from core.paths import find_resource


@dataclass(frozen=True)
class QuestionRow:
    question_id: str
    category: str
    question: str


def load_questions(path: str) -> list[QuestionRow]:
    resolved = find_resource(path)
    if not resolved.is_file():
        raise FileNotFoundError(
            f"Questionnaire not found at '{path}'. Run from the repo root or mount "
            f"data/ into the container."
        )

    rows: list[QuestionRow] = []
    with open(resolved, newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        for line_no, row in enumerate(reader, start=2):
            question = (row.get("question") or "").strip()
            question_id = (row.get("question_id") or "").strip()
            if not question_id or not question:
                # Skip blank or malformed rows rather than crashing the run.
                print(f"[intake] skipping malformed CSV row at line {line_no}")
                continue
            rows.append(
                QuestionRow(
                    question_id=question_id,
                    category=(row.get("category") or "").strip(),
                    question=question,
                )
            )
    return rows
