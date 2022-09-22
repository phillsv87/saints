#!/bin/bash
set -e

set -o allexport
source "$(dirname "$0")/../.env"

if [ -f "$(dirname "$0")/../.env.local" ]; then
    source "$(dirname "$0")/../.env.local"
fi

set +o allexport
