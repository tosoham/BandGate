FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Build context is the repo root (this Dockerfile lives at the root so the
# context is unambiguous on Render and in docker-compose alike).
COPY backend/ ./
RUN pip install --no-cache-dir -e ".[dev,band]"

COPY data/ ./data/
COPY knowledge_base/ ./knowledge_base/

EXPOSE 8000

# Render and most PaaS inject $PORT; bind to it, falling back to 8000 locally.
# (docker-compose overrides this command, so local dev stays on 8000.)
CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT:-8000}"]
