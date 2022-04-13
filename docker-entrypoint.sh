#!/bin/sh
yarn build
export BACKEND_URL=$URL
yarn start --hostname 0.0.0.0