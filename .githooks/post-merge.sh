#!/usr/bin/env bash

YELLOW='\033[0;33m'
NO_COLOR='\033[0m'

SRC_PRESENT=$(git diff ORIG_HEAD HEAD --exit-code --name-only -- *.scss)

if [ -n "$SRC_PRESENT" ]
then
  echo -e "${YELLOW}Changes in *.scss files detected, rebuilding dist files...${NO_COLOR}"
  npx gulp sass
fi
