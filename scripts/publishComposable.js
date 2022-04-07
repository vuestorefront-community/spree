/* eslint-disable unicorn/prefer-module */
const path = require('path');
const { publishPackages } = require('./lib/publishNpm');
const { Logger } = require('@vue-storefront/core');

const myArgs = process.argv.slice(2);
const labels = myArgs[0];

publishPackages(path.join(process.cwd(), 'packages', 'composables'), labels)
  .then(Logger.debug)
  .catch((e) => {
    Logger.error(e);
  });
