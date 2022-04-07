/* eslint-disable unicorn/no-process-exit, unicorn/prefer-module */
const { exec } = require("child_process");
const { Logger } = require('@vue-storefront/core');

const publishPackages = (pkgPath, labels) => {
  return new Promise((_res, _rej) => {
    try {
      const command = `npm publish ${pkgPath} --access public --tag ${labels}`;

      Logger.debug(command)

      exec(command, (error, stdout, stderr) => {
        if (error) {
          Logger.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          Logger.error(`stderr: ${stderr}`);
          return;
        }
        Logger.debug(`stdout: ${stdout}`);
      });
    } catch (e) {
      Logger.error(e);
    }
  });
}

module.exports = {
  publishPackages,
}
