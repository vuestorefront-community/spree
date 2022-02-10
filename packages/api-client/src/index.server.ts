import { apiClientFactory, ApiClientExtension } from '@vue-storefront/core';
import { makeClient } from '@spree/storefront-api-v2-sdk/src';
import getProduct from './api/getProduct';
import getProducts from './api/getProducts';
import getCategory from './api/getCategory';
import logIn from './api/logIn';
import logOut from './api/logOut';
import getCurrentUser from './api/getCurrentUser';
import isGuest from './api/isGuest';
import changePassword from './api/changePassword';
import registerUser from './api/registerUser';
import addAddress from './api/addAddress';
import getAddresses from './api/getAddresses';
import getAvailableCountries from './api/getAvailableCountries';
import getCountryDetails from './api/getCountryDetails';
import updateAddress from './api/updateAddress';
import getCart from './api/getCart';
import addToCart from './api/addToCart';
import updateItemQuantity from './api/updateItemQuantity';
import removeFromCart from './api/removeFromCart';
import clearCart from './api/clearCart';
import applyCoupon from './api/applyCoupon';
import removeCoupon from './api/removeCoupon';
import saveCheckoutShippingAddress from './api/saveCheckoutShippingAddress';
import saveCheckoutBillingAddress from './api/saveCheckoutBillingAddress';
import createAuthIntegration from './api/authentication/integration';
import createInternationalizationIntegration from './api/internationalization/integration';
import getOrCreateCart from './api/getOrCreateCart';
import getOrders from './api/getOrders';
import saveGuestCheckoutEmail from './api/saveGuestCheckoutEmail';
import getShipments from './api/getShipments';
import saveShippingMethod from './api/saveShippingMethod';
import getPaymentMethods from './api/getPaymentMethods';
import savePaymentMethod from './api/savePaymentMethod';
import getPaymentConfirmationData from './api/getPaymentConfirmationData';
import handlePaymentConfirmationResponse from './api/handlePaymentConfirmationResponse';
import makeOrder from './api/makeOrder';
import forgotPassword from './api/forgotPassword';
import resetPassword from './api/resetPassword';
import changeCurrency from './api/changeCurrency';
import {AxiosInstance} from 'axios';
import {objectToQuerystring} from '@spree/storefront-api-v2-sdk/src/helpers/request';
import FetchError from '@spree/storefront-api-v2-sdk/src/errors/FetchError';
const defaultSettings = {
  backendUrl: 'https://demo.spreecommerce.org',
  spreeFeatures: {
    associateGuestCart: true,
    fetchPrimaryVariant: true
  }
};

const onCreate = (settings) => {
  return {
    config: {
      ...defaultSettings,
      ...settings
    },
    client: makeClient({
      host: settings.backendUrl || defaultSettings.backendUrl,
      createFetcher: (fetcherOptions) => {
        let Axios;

        if (globalThis.axios) {
          Axios = globalThis.axios;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          Axios = require('axios').default;
        }

        const axios: AxiosInstance = Axios.create({
          baseURL: fetcherOptions.host,
          headers: { 'Content-Type': 'application/json' },
          paramsSerializer: (params) => objectToQuerystring(params)
        });

        return {
          fetch: async (fetchOptions) => {
            try {
              const { url, params, method, headers, responseParsing } = fetchOptions;
              let payload;

              switch (method.toUpperCase()) {
                case 'PUT':
                case 'POST':
                case 'DELETE':
                case 'PATCH':
                  payload = { data: params };
                  break;
                default:
                  payload = { params };
              }

              let responseType: string;

              switch (responseParsing) {
                case 'json':
                case 'text':
                  responseType = responseParsing;
                  break;
                case 'stream':
                  responseType = 'stream';
                  break;
                default:
                  responseType = undefined;
              }

              const response = await axios({
                url,
                method: method.toUpperCase(),
                headers,
                responseType,
                ...payload
              });

              return { data: response.data };
            } catch (error) {
              if (Axios.isAxiosError(error)) {
                const { response } = error;

                if (!response) {
                  throw new FetchError(null, error.request, null, error.message);
                }

                const reducedResponse = { ...response };

                // Reduce logging by removing the 'enumerable' flag on some keys in AxiosResponse.
                Object.defineProperties(reducedResponse, {
                  config: { enumerable: false },
                  data: { enumerable: false },
                  headers: { enumerable: false },
                  request: { enumerable: false }
                });

                throw new FetchError(reducedResponse, error.request, reducedResponse.data, error.message);
              }

              throw new FetchError(null, null, null, error.message);
            }
          }
        };
      }
    })
  };
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => {
    const auth = createAuthIntegration(req, res);
    const internationalization = createInternationalizationIntegration(req, res);

    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        auth,
        internationalization
      })
    };
  }
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getProducts,
    getCategory,
    getCurrentUser,
    logIn,
    logOut,
    isGuest,
    changePassword,
    registerUser,
    addAddress,
    getAddresses,
    getAvailableCountries,
    getCountryDetails,
    updateAddress,
    getCart,
    addToCart,
    updateItemQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    saveCheckoutShippingAddress,
    saveCheckoutBillingAddress,
    getOrCreateCart,
    getOrders,
    saveGuestCheckoutEmail,
    getShipments,
    saveShippingMethod,
    getPaymentMethods,
    savePaymentMethod,
    getPaymentConfirmationData,
    handlePaymentConfirmationResponse,
    makeOrder,
    forgotPassword,
    resetPassword,
    changeCurrency
  },
  extensions: [tokenExtension]
});

export {
  createApiClient
};
