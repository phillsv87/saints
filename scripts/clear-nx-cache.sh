#!/bin/bash
set -e
cd "$(dirname "$0")/.."

rm -rf node_modules/.cache
rm -rf dist
rm -rf packages/web/.next
