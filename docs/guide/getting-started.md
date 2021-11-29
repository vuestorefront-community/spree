# Getting Started

## Requirements

- Spree 4.2 or later (4.3 preferred for full feature support)
- Spree Gateway 3.9.4+
- Node 14

## Connecting integration to Spree

By default, the Vue Storefront application will connect to the API at https://demo.spreecommerce.org.
To change it, open `middleware.config.js` and update it with your own API url.

If you're using Spree 4.2, you'll also need to change the configuration used for `spreeFeatures` to `defaultFeatures.spree42`.

```js
module.exports = {
  integrations: {
    spree: {
      location: '@vue-storefront/spree-api/server',
      configuration: {
        backendUrl: process.env.BACKEND_URL,
        spreeFeatures: defaultFeatures.spree43
      }
    }
  }
};

```

In order for the password reset feature to work properly, you need to change the URL of password reset emails to point to: `/resetPassword?token=...`