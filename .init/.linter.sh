#!/bin/bash
cd /home/kavia/workspace/code-generation/mvp-career-platform-db-1-214773-214792/CareerPlatformWebFrontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

