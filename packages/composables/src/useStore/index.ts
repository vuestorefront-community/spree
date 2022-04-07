import { Logger, useStoreFactory, UseStoreFactoryParams } from '@vue-storefront/core';

const params: UseStoreFactoryParams<any> = {
  async load() {
    Logger.debug('Mocked: loadStore');
  },
  async change() {
    Logger.debug('Mocked: changeStore');
  }
};

export default useStoreFactory<any>(params);
