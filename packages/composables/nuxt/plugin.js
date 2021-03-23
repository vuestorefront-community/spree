import { integrationPlugin } from '@vue-storefront/core';

const moduleOptions = <%= serialize(options) %>;

const spreeAuthCookie = 'spree-bearer-token'

export default integrationPlugin(({ app, integration }) => {
  const changeToken = (newToken) => {
    app.$cookies.set(spreeAuthCookie, newToken)
  };

  const removeToken = () => {
    app.$cookies.remove(spreeAuthCookie)
  };

  const getToken = () => {
    return app.$cookies.get(spreeAuthCookie)
  };

  integration.configure('spree', {
    ...moduleOptions,
    auth: {
      changeToken,
      removeToken,
      getToken
    }
  });
});
