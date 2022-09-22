#!/bin/bash
set -e
cd "$(dirname "$0")/.."

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Creating pipeline for $BRANCH"
echo "Press Ctrl+C to cancel"
sleep 5

npm run install-all

scripts/nx-run-with-env.sh "branch-$BRANCH" 'cdk:deploy' '1'
