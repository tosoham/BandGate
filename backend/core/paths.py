"""Resource path resolution that works regardless of the working directory.

In Docker the working directory is ``/app`` (with ``data/`` and
``knowledge_base/`` copied alongside the backend), while local runs may start
from the repo root or from ``backend/``. This resolver walks up from both the
current working directory and this module's location to find the resource.
"""

from pathlib import Path

# Anchors that mark the project root (any one of these living in a directory
# means resources like data/ and knowledge_base/ are siblings there).
_ROOT_MARKERS = ("knowledge_base", "data")


def _search_bases() -> list[Path]:
    bases: list[Path] = []
    cwd = Path.cwd()
    bases.extend([cwd, *cwd.parents])
    here = Path(__file__).resolve().parent
    bases.extend([here, *here.parents])
    # De-duplicate while preserving order.
    seen: set[Path] = set()
    unique: list[Path] = []
    for base in bases:
        if base not in seen:
            seen.add(base)
            unique.append(base)
    return unique


def find_resource(relative: str) -> Path:
    """Return an existing absolute path for ``relative``, or the bare path."""
    direct = Path(relative)
    if direct.exists():
        return direct
    for base in _search_bases():
        candidate = base / relative
        if candidate.exists():
            return candidate
    return direct


def project_root() -> Path:
    """Best-effort project root: the first base that contains a root marker."""
    for base in _search_bases():
        if any((base / marker).exists() for marker in _ROOT_MARKERS):
            return base
    return Path.cwd()
