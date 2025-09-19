FROM docker.io/library/node:24-slim

WORKDIR /opt/workspace
COPY LICENSE .

RUN set -x \
    && apt-get update \
    && apt-get install -y curl \
    && npm install -g npm \
    && npm install -g -D playwright@latest \
    && npm install -D @playwright/test \
    && playwright install chromium firefox --only-shell --with-deps

ENV BASE_URL="https://roratorio-hub.github.io/staging/ro4/m/calcx.html"
COPY playwright.config.ts .
COPY tests/ tests/

CMD ["npx", "playwright", "test"]
