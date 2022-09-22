#!/bin/bash
set -e
cd "$(dirname "$0")"
source config.sh

open "https://$NX_AWS_REGION.console.aws.amazon.com/acm/home?region=$NX_AWS_REGION#/certificates/list"
