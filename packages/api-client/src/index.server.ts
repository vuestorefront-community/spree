import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';

import addAddress from './api/addAddress';
import addToCart from './api/addToCart';
import addToWishlist from './api/addToWishlist';
import applyCoupon from './api/applyCoupon';
import changeCurrency from './api/changeCurrency';
import changePassword from './api/changePassword';
import clearCart from './api/clearCart';
import createAuthIntegration from './api/authentication/integration';
import createInternationalizationIntegration from './api/internationalization/integration';
import deleteAddress from './api/deleteAddress';
import deleteWishlist from './api/deleteWishlist';
import forgotPassword from './api/forgotPassword';
import getAddresses from './api/getAddresses';
import getAvailableCountries from './api/getAvailableCountries';
import getCMSPage from './api/getCMSPage';
import getCart from './api/getCart';
import getCategory from './api/getCategory';
import getCountryDetails from './api/getCountryDetails';
import getCurrentUser from './api/getCurrentUser';
import getMenus from './api/getMenus';
import getOrCreateCart from './api/getOrCreateCart';
import getOrder from './api/getOrder';
import getOrders from './api/getOrders';
import getPaymentConfirmationData from './api/getPaymentConfirmationData';
import getPaymentMethods from './api/getPaymentMethods';
import getProduct from './api/getProduct';
import getProducts from './api/getProducts';
import getShipments from './api/getShipments';
import getWishlist from './api/getWishlist';
import handlePaymentConfirmationResponse from './api/handlePaymentConfirmationResponse';
import isGuest from './api/isGuest';
import logIn from './api/logIn';
import logOut from './api/logOut';
import { makeClient } from '@spree/storefront-api-v2-sdk';
import makeOrder from './api/makeOrder';
import registerUser from './api/registerUser';
import removeCoupon from './api/removeCoupon';
import removeFromCart from './api/removeFromCart';
import removeFromWishlist from './api/removeFromWishlist';
import resetPassword from './api/resetPassword';
import saveCheckoutBillingAddress from './api/saveCheckoutBillingAddress';
import saveCheckoutShippingAddress from './api/saveCheckoutShippingAddress';
import saveGuestCheckoutEmail from './api/saveGuestCheckoutEmail';
import savePaymentMethod from './api/savePaymentMethod';
import saveShippingMethod from './api/saveShippingMethod';
import updateAddress from './api/updateAddress';
import updateCurrentUser from './api/updateCurrentUser';
import updateItemQuantity from './api/updateItemQuantity';
import createAxiosFetcher from '@spree/storefront-api-v2-sdk/dist/server/createAxiosFetcher';
import { ApiContext } from './types';
import getCurrentBearerToken from './api/authentication/getCurrentBearerToken';
import getCurrentCartToken from './api/authentication/getCurrentCartToken';

const defaultSettings = {
  backendUrl: 'https://demo.spreecommerce.org',
  assetsUrl: null,
  spreeFeatures: {
    associateGuestCart: true,
    fetchPrimaryVariant: true
  }
};

const onCreate = (settings) => {
  const locale = settings.internationalization.getLocale();
  const currency = settings.internationalization.getCurrency();
  const config = {
    ...defaultSettings,
    ...settings
  };
  return {
    config,
    client: makeClient({
      host: config.backendUrl,
      createFetcher: createAxiosFetcher
    })
      .withLocale(locale)
      .withCurrency(currency)
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

const injectClientTokens = async (context: ApiContext): Promise<ApiContext> => {
  const [orderToken, bearerToken] = await Promise.all([
    getCurrentCartToken(context.config),
    getCurrentBearerToken(context)
  ]);
  return {
    ...context,
    client: context.client
      .withBearerToken(bearerToken)
      .withOrderToken(orderToken?.orderToken)
  };
};

const withEndpointMiddleware = <RESPONSE = any>(
  endpointFunction: (...params: any) => Promise<RESPONSE>
) => {
  return async (
    endpointContext: ApiContext,
    ...args: any
  ): Promise<RESPONSE> => {
    const context = await injectClientTokens(endpointContext);
    return await endpointFunction(context, ...args);
  };
};

const api = Object.entries({
  getProduct,
  getProducts,
  getCategory,
  getCurrentUser,
  updateCurrentUser,
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
  getOrder,
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
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  deleteWishlist,
  changeCurrency,
  deleteAddress,
  getMenus,
  getCMSPage
}).reduce(
  (obj, [endpointKey, endpointArgs]) => ({
    ...obj,
    [endpointKey]: withEndpointMiddleware(endpointArgs)
  }),
  {}
);

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api,
  extensions: [tokenExtension]
});

export {
  createApiClient
};
