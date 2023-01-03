# Configuration

The integration is configured via `middleware.config.js` file:

```js
module.exports = {
  integrations: {
    spree: {
      location: '@vue-storefront/spree-api/server',
      configuration: {
        backendUrl: process.env.BACKEND_URL,
        assetsUrl: process.env.ASSETS_URL,
        spreeFeatures: {
          ...defaultFeatures[process.env.SPREE_VERSION || 'spree45'],
          wishlist: 'disabled'
        }
      }
    }
  }
};
```

## Environment variables
All the settings can be specified by using the environment variables as long as you don't need to make custom changes to [Spree Features](#spree-features) configuration.

A recommended way of setting the variables is via `.env.development` and `.env.production` files:
```sh
BACKEND_URL=http://localhost:4000
ASSETS_URL=...
SPREE_VERSION=...
```

### Backend URL

By default, the Vue Storefront application will connect to the API at https://demo.spreecommerce.org. You can change it by setting the `BACKEND_URL` env variable.

### Assets URL
The `ASSETS_URL` indicates the main url for images, css. If it's not present, it will fallback to `BACKEND_URL`.

### Spree version (presets)
Specify the version of Spree that you are using (if not provided, it will fallback to `spree45`). Using a dedicated preset will ensure that Vue Storefront only uses the [features](#spree-features) compatible with your version of Spree.

The supported options are: `spree43`, `spree44`, `spree45`.

## Spree Features

Spree features is an object containing features flags to be enabled. This is done to achieve backwards compatibility with various Spree versions.

Also some features that are either provided by Spree's extensions or that are only available in newer versions, need to be manually enabled in the configuration file (for example wishlists). You can also use it to overwrite the chosen [preset](#spree-version-presets)'s feature configuration.

```js
spreeFeatures: {
  ...
  // Associate guest cart after the customer logs in. Requires Spree 4.3+
  associateGuestCart: false,
  // Fetch basic information about products from the `primary_variant` relationship. Requires Spree 4.3+
  fetchPrimaryVariant: false,
  // Wishlist for authenticated users.
  // Accepted values: 'enabled' (Spree 4.4+), 'legacy' (Spree with `spree_wishlist` gem), 'disabled'.
  wishlist:  'disabled'
}
```

:::tip
Some of the features that require Spree 4.3+ can be disabled, to provide slightly degraded experience, but you may do it if you'd like to experiment with Vue Storefront without upgrading 4.2 to 4.3.
:::

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

## Spree configuration

### Password reset functionality
In order for the password reset feature to work properly, you need to change the URL of password reset emails to point to: `/resetPassword?token=...`