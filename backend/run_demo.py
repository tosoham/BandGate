from agents.orchestrator import build_demo_state
from core.embeddings import (
    DEFAULT_INDEX_PATH,
    DEFAULT_KB_ROOTS,
    EmbeddingIndex,
    build_index,
    reset_cache,
)
from core.export import write_outputs
from core.model_clients import aiml_available
from core.paths import project_root
from core.provider_config import load_provider_config


def _index_is_fresh() -> bool:
    """True when the persisted embedding index can be reused as-is.

    The index is reusable only when it was built with the currently configured
    embedding model, is newer than every knowledge-base markdown file, and is
    not a degraded (vector-less) index while AI/ML is now available. Otherwise
    we rebuild — which, with a live AI/ML key, costs one embedding call per
    knowledge-base chunk, so skipping when nothing changed preserves credits.
    """
    index_path = project_root() / DEFAULT_INDEX_PATH
    if not index_path.exists():
        return False
    saved = EmbeddingIndex.load()
    if saved is None:
        return False
    if saved.embedding_model != load_provider_config().aiml_embedding_model:
        return False
    if aiml_available() and not saved.ready:
        # A previous run built an empty index (no live key); we can do better now.
        return False
    index_mtime = index_path.stat().st_mtime
    for root in DEFAULT_KB_ROOTS:
        for markdown in (project_root() / root).rglob("*.md"):
            if markdown.stat().st_mtime > index_mtime:
                return False
    return True


def main() -> None:
    # Build the RAG embedding index before deliberation so security/compliance
    # answers retrieve over fresh evidence, but skip the rebuild when the
    # persisted index is already current — otherwise each run re-embeds the
    # whole corpus and burns AI/ML credits for nothing.
    reset_cache()
    if _index_is_fresh():
        print("[run_demo] embedding index is current — skipping rebuild.")
    else:
        build_index().save()
        reset_cache()
    state = build_demo_state()
    write_outputs(state)
    finalized = sum(1 for question in state.questions.values() if question.status == "finalized")
    print(f"Wrote {len(state.questions)} questions, {finalized} finalized demo answers, and {len(state.promise_ledger)} ledger entries.")


if __name__ == "__main__":
    main()
