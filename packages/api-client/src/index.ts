import { apiClientFactory } from '@vue-storefront/core';
import { makeClient } from '@spree/storefront-api-v2-sdk'
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import logIn from './api/logIn';
import logOut from './api/logOut';
import isGuest from './api/isGuest';

const defaultSettings = {};

const onSetup = (settings) => ({
  config: {
    ...defaultSettings,
    ...settings
  },
  client: makeClient({ host: 'https://demo.spreecommerce.org' })
});

const { createApiClient } = apiClientFactory<any, any>({
  tag: 'spree',
  onSetup,
  api: {
    getProduct,
    getCategory,
    logIn,
    logOut,
    isGuest,
  }
});

export {
  createApiClient
};

export * from './types';
