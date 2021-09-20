# Getting Started

## Connecting integration to Spree

By default, the Vue Storefront application will connect to the API at http://localhost:4000.
To change it, open `middleware.config.js` and update it with your own API url.

If you're using Spree 4.2, you'll also need to change the configuration used for `spreeFeatures` to `defaultFeatures.spree42`.

```js
module.exports = {
  integrations: {
    spree: {
      location: '@upsidelab/vue-storefront-spree-api/server',
      configuration: {
        backendUrl: process.env.BACKEND_URL,
        spreeFeatures: defaultFeatures.spree43
      }
    }
  }
};

```
