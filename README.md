<div align="center">
  <img src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png" alt="Vue Storefront" height="80px" />
</div>

### Stay connected

[![GitHub Repo stars](https://img.shields.io/github/stars/vuestorefront/vue-storefront?style=social)](https://github.com/vuestorefront/vue-storefront)
[![Twitter Follow](https://img.shields.io/twitter/follow/vuestorefront?style=social)](https://twitter.com/vuestorefront)
[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCkm1F3Cglty3CE1QwKQUhhg?style=social)](https://www.youtube.com/c/VueStorefront)
[![Discord](https://img.shields.io/discord/770285988244750366?label=join%20discord&logo=Discord&logoColor=white)](https://discord.vuestorefront.io)

# Vue Storefront 2 integration for Spree Commerce

See it action: [Vue Storefront - Spree demo](https://vuestorefront-spree.upsidelab.io)

## Overview

This repository contains an Spree integration for [Vue Storefront 2](https://github.com/vuestorefront/vue-storefront/).

This integration is being developed and maintained by [Upside](https://upsidelab.io)

<a href="https://upsidelab.io"><img src="https://user-images.githubusercontent.com/6420475/141106487-333774a5-04b2-46a4-8367-7cb11e46906e.png" height="100px" /></a>

## Requirements

- Node 14.15+
- Spree-based store with V2 API available. Some API endpoints used by the integration are only available in Spree 4.2+, so you may need to either upgrade the store or backport these features to your backend.

## Deploy in the cloud

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
## Getting Started

1. Clone this repository
```sh
git clone https://github.com/vuestorefront/spree.git
```

2. Install all required dependencies:

```sh
yarn install
```

3. Set backend URL via env variable
```sh
export BACKEND_URL=https://demo.spreecommerce.org
```
Or via `.env.development` file:
```
BACKEND_URL=https://demo.spreecommerce.org
```

4. Then build all three projects:

```sh
yarn build
```

5. If everything built properly, you can start working on your new frontend with:

```sh
yarn dev
```

Changing some parts of the code (notably the `api-client`) will trigger a re-build but the change will not be hot-reloaded. To ensure that the app sees you changes, re-run either `yarn build` or `yarn dev`.

## Running Vue Storefront + Spree in Docker

1. Initialize the Git submodules and setup Spree images
```sh
./bin/setup
```

2. (optional) Seed the backend database
```sh
./bin/seed
```

3. Start the application
```sh
./bin/start
```

The Vue Storefront application is available at `http://localhost:3000`.
The Spree backend is exposed at `http://localhost:4000`.

4. Stopping the application
```sh
./bin/stop
```

## Enabling optional features

Some features that are either provided by Spree's extensions or that are only available in newer versions, need to be manually enabled in the configuration file. To do that, open the `packages/theme/middleware.config.js` and update the configuration to desired state

```
module.exports = {
  integrations: {
    spree: {
      location: '@vue-storefront/spree-api/server',
      configuration: {
        backendUrl: process.env.BACKEND_URL,
        assetsUrl: process.env.ASSETS_URL,
        spreeFeatures: {
          // Associate guest cart after the customer logs in. Requires Spree 4.3+
          associateGuestCart: false,
          // Fetch basic information about products from the `primary_variant` relationship. Requires Spree 4.3+
          fetchPrimaryVariant: false,
          // Wishlist for authenticated users.
          // Accepted values: 'enabled' (Spree 4.4+), 'legacy' (Spree with `spree_wishlist` gem), 'disabled'.
          wishlist:  'disabled'
        }
      }
    }
  }
};

```

## Repository structure

The monorepo contains three submodules:
- api-client - low level backend API connector, utilizing Spree's v2 Storefront API
- composables - reusable business logic
- theme - Nuxt.js-based frontend application

For more details, refer to the official [project structure](https://docs.vuestorefront.io/v2/getting-started/project-structure.html).

## Feature support

| Feature | Status | Notes |
| --- | --- | --- |
| Sign in | Available | |
| Sign up | Available | |
| Product catalog | Available | Default implementation uses /v2/storefront/products endpoint for filtering, it's advisable to use ElasticSearch for best performance | Product details page | Available | |
| Account | Partial | Requires Spree 4.2 |
| Account - saved addresses | Available | Requires Spree 4.2 |
| Account - reset password | Available | URL from password reset emails should point to: `/resetPassword?token=...` |
| Account - order history | Available | |
| Cart | Available | Associating guest orders upon login requires Spree 4.3 and needs to be enable via configuration |
| Checkout | Available | |
| Checkout - Shipping methods | Available | |
| Checkout - Payment methods | Available | Cash and Stripe Elements gateways supported out of the box. |
| Wishlists | Available | Available only for logged in users. By default, this feature is disabled and can be enabled in `middleware.config.js` |
| Multi-currency support | Available | Requires Spree 4.2 or spree_multi_currency extension |

## Caching and performance concerns

### Spree 4.3

V2 API endpoints include built-in cache.

### Spree 4.2
In Spree < 4.3, API endpoints aren't cached out of the box. To ensure smooth operation of the frontend, you need to add caching to GET actions of the API. Putting e.g. AWS Cloudfront in front of the API is a fairly simple option and can do wonders in that regard. If your application uses custom logic (e.g. different price for each user), remember to make sure that your cache keys reflect that.

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Spree Storefront API Documentation](https://api.spreecommerce.org/docs/api-v2/api/docs/v2/storefront/index.yaml)

## Demo

- [Vue Storefront - Spree demo](https://vuestorefront-spree.upsidelab.io) - demo instance connected to [https://demo.spreecommerce.org](https://demo.spreecommerce.org) APIs
