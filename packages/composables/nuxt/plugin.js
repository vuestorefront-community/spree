import { integrationPlugin } from '@upsidelab/vue-storefront-spree';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

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

  integration.configure({
    ...moduleOptions,
    auth: {
      changeToken,
      removeToken,
      getToken
    }
  });
});
