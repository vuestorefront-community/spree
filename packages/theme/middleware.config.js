module.exports = {
  integrations: {
    spree: {
      location: '@upsidelab/vue-storefront-spree-api/server',
      configuration: {
        backendUrl: process.env.BACKEND_URL
      }
    }
  }
};
