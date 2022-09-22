#!/bin/bash
set -e
cd "$(dirname "$0")/.."

BRANCH=$(git rev-parse --abbrev-ref HEAD)
DIFF=$(git status --porcelain)

if [ "$DIFF" != "" ]; then
    echo "$BRANCH is dirty - $DIFF"
    exit 1
fi

echo "Creating pipeline for ($BRANCH)"
echo "Press Ctrl+C to cancel"
sleep 5

npm run install-all

npx nx reset

scripts/nx-run-with-env.sh "branch-$BRANCH" 'cdk:deploy' '1'
