#!/bin/bash

mkdir -p test-results

podman run -it --rm \
  --name testing-roratorio-hub \
  --network=host \
  -v $(pwd)/test-results:/opt/workspace/test-results \
  -e BASE_URL="http://localhost/ratorio/ro4/m/calcx.html" \
  localhost/roratorio-hub/e2e-testkit:latest-arm64 \
  npx playwright test
