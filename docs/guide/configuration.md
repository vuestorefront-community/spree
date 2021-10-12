# Configuration

The integration is configured via `middleware.config.js` file.

```
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

## Backend URL

By default the integration will use the `BACKEND_URL` environment variable. If it's not present, it will fallback to `https://demo.spreecommerce.org`.

## Spree Features

Spree features is an object containing features flags to be enabled.
This is done to achieve backwards compatibility, as some of the features require Spree 4.3+. They can be disabled, to provide slightly degraded experience, but you may do it if you'd like to experiment with Vue Storefront without upgrading 4.2 to 4.3.

```js
spreeFeatures: {
  associateGuestCart: true,
  fetchPrimaryVariant: true
}
```

### associateGuestCart

Defines whether a guest cart should be associated with user after sign in. This requires `/api/v2/storefront/cart/associate` endpoint, available in Spree 4.3+.
When disabled, after the user signs in, the guest cart will be dropped.

### fetchPrimaryVariant

Defines whether fetching product catalog/details should use `primary_variant` association for product information. This is available in Spree 4.3+.
When disabled, the variant with `is_master == true` will be used.
