#!/bin/bash
set -euo pipefail
dnf update -y
dnf install -y git
dnf install -y nodejs22
node -v
npm -v
# The application is deployed separately in the deployment phase.
# This script intentionally avoids embedding credentials.
