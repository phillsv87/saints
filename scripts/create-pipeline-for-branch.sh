#!/bin/bash
set -e
cd "$(dirname "$0")/.."

npm run install-all

scripts/nx-run-with-env.sh "branch-$(git rev-parse --abbrev-ref HEAD)" 'cdk:deploy' '1'
