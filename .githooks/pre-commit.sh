#!/usr/bin/env bash

RED='\033[0;31m'
RESET_COLOR='\033[0m'

DIST_PRESENT=$(git diff --name-only --cached -- *.css)

if [ -n "$DIST_PRESENT" ]
then
  echo -e "${RED}*.css files detected in your commit, please remove them!${RESET_COLOR}"
  exit 1
fi

npx lint-staged
