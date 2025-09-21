#!/bin/bash

export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)

aws ecr-public get-login-password --region us-east-1 \
  | podman login --username AWS --password-stdin public.ecr.aws/u3l2i4k1

aws ecr-public create-repository \
  --repository-name m10i/roratorio-hub-e2e-testkit \
  --region us-east-1

# Build amd64 container image and push to ECR
podman build --pull-always --tag roratorio-hub/e2e-testkit:latest-amd64 \
  --platform=linux/amd64 \
  --force-rm \
  -f Containerfile .

podman tag roratorio-hub/e2e-testkit:latest-amd64 \
  public.ecr.aws/u3l2i4k1/m10i/roratorio-hub-e2e-testkit:latest-amd64
podman push \
  public.ecr.aws/u3l2i4k1/m10i/roratorio-hub-e2e-testkit:latest-amd64

# Build arm64 container image and push to ECR
podman build --pull-always --tag roratorio-hub/e2e-testkit:latest-arm64 \
  --platform=linux/arm64 \
  --force-rm \
  -f Containerfile .

podman tag roratorio-hub/e2e-testkit:latest-arm64 \
  public.ecr.aws/u3l2i4k1/m10i/roratorio-hub-e2e-testkit:latest-arm64
podman push \
  public.ecr.aws/u3l2i4k1/m10i/roratorio-hub-e2e-testkit:latest-arm64
