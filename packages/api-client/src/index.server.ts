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
import { default as createAxiosFetcher } from '@spree/storefront-api-v2-sdk/dist/server/createAxiosFetcher';
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

const defaultSettings = {
  backendUrl: 'https://demo.spreecommerce.org',
  assetsUrl: null,
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
    client: makeClient({ host: settings.backendUrl || defaultSettings.backendUrl, createFetcher: createAxiosFetcher })
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
  },
  extensions: [tokenExtension]
});

export {
  createApiClient
};
