# Configuration

The integration is configured via `middleware.config.js` file.

```
module.exports = {
  integrations: {
    spree: {
      location: '@vue-storefront/spree-api/server',
      configuration: {
        backendUrl: process.env.BACKEND_URL,
        assetsUrl: process.env.ASSETS_URL,
        spreeFeatures: defaultFeatures.spree43
      }
    }
  }
};
```

## Backend URL

By default the integration will use the `BACKEND_URL` environment variable. If it's not present, it will fallback to `https://demo.spreecommerce.org`.

## Assets URL
The `ASSETS_URL` indicate the main url for images, css. f it's not present, it will fallback to `BACKEND_URL`.

## Spree Features

Spree features is an object containing features flags to be enabled.
This is done to achieve backwards compatibility, as some of the features require Spree 4.3+. They can be disabled, to provide slightly degraded experience, but you may do it if you'd like to experiment with Vue Storefront without upgrading 4.2 to 4.3.

```js
spreeFeatures: {
  associateGuestCart: true,
  fetchPrimaryVariant: true,
  wishlist: 'disabled'
}
```

### associateGuestCart

Defines whether a guest cart should be associated with user after sign in. This requires `/api/v2/storefront/cart/associate` endpoint, available in Spree 4.3+.
When disabled, after the user signs in, the guest cart will be dropped.

### fetchPrimaryVariant

Defines whether fetching product catalog/details should use `primary_variant` association for product information. This is available in Spree 4.3+.
When disabled, the variant with `is_master == true` will be used.

### wishlist

Defines which api-client methods should be used in order to allow users using wishlist. V1 methods are integrated with `spree_wishlist` gem API, but V2 support Spree 4.4+ wishlist API.
Accepted `wishlist` values:
- `'enabled'` (Spree 4.4+)
- `'legacy'` (Spree older than 4.4 with `spree_wishlist` gem installed)
- `'disabled'` (Spree older than 4.4 without `spree_wishlist` gem)
