#!/bin/bash

ENV=$1

set -o allexport
source "$(dirname $BASH_SOURCE)/../.env"

if [ -f "$(dirname $BASH_SOURCE)/../.env.local" ]; then
    source "$(dirname $BASH_SOURCE)/../.env.local"
fi

if [ "$ENV" != "" ]; then
    source "$(dirname $BASH_SOURCE)/../.env.$ENV"
fi

set +o allexport
