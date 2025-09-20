#!/bin/bash

export AWS_ACCOUNT_ID=125536519930
export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
export AWS_DEFAULT_REGION=ap-northeast-1

aws ecr get-login-password --region ${AWS_DEFAULT_REGION} \
  | podman login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com

aws ecr create-repository \
  --repository-name roratorio-hub/e2e-testkit \
  --region ${AWS_DEFAULT_REGION}

# Build amd64 container image and push to ECR
podman build --pull-always --tag roratorio-hub/e2e-testkit:latest-amd64 \
  --platform=linux/amd64 \
  --force-rm \
  -f Containerfile .

podman tag roratorio-hub/e2e-testkit:latest-amd64 \
  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/roratorio-hub/e2e-testkit:latest-amd64
podman push \
  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/roratorio-hub/e2e-testkit:latest-amd64

# Build arm64 container image and push to ECR
podman build --pull-always --tag roratorio-hub/e2e-testkit:latest-arm64 \
  --platform=linux/arm64 \
  --force-rm \
  -f Containerfile .

podman tag roratorio-hub/e2e-testkit:latest-arm64 \
  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/roratorio-hub/e2e-testkit:latest-arm64
podman push \
  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/roratorio-hub/e2e-testkit:latest-arm64
