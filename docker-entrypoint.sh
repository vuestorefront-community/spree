#!/bin/sh
yarn build
export BACKEND_URL=$BACKEND_URL
yarn start --hostname 0.0.0.0