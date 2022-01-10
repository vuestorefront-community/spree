import { useStoreFactory, UseStoreFactoryParams } from '@vue-storefront/core';

const params: UseStoreFactoryParams<any> = {
  async load() {
    console.log('Mocked: loadStore');
  },
  async change() {
    console.log('Mocked: changeStore');
  }
};

export default useStoreFactory<any>(params);
