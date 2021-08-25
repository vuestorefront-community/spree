![Vue Storefront](https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067)

# Vue Storefront 2 integration for Spree Commerce

See it action: [Vue Storefront - Spree demo](https://vuestorefront-spree.upsidelab.io)

## Overview

This repository contains an Spree integration for [Vue Storefront 2](https://github.com/vuestorefront/vue-storefront/).

This integration is being developed and maintained by [Upside](https://upsidelab.io)

Spree integration is currently in beta stage, with more updates and stable version coming soon.

## Requirements

- Node 14.15+
- Spree-based store with V2 API available. Some API endpoints used by the integration are only available in Spree 4.2+, so you may need to either upgrade the store or backport these features to your backend.

## Getting Started

1. Clone this repository
```sh
git clone https://github.com/upsidelab/vue-storefront-spree.git
```

2. Install all required dependencies:

```sh
yarn install
```

3. Set backend URL via env variable
```sh
export BACKEND_URL=https://demo.spreecommerce.org
```

4. (optional) Then you can verify if everything works properly by building all three projects:

```sh
yarn build
```

5. If everything built properly, you can start working on your new frontend with:

```sh
yarn dev
```

## Repository structure

The monorepo contains three submodules:
- api-client - low level backend API connector, utilizing Spree's v2 Storefront API
- composables - reusable business logic
- theme - Nuxt.js-based frontend application

For more details, refer to the official [architecture diagram](https://docs.vuestorefront.io/v2/advanced/architecture.html).

## Feature support

| Feature | Status | Notes |
| --- | --- | --- |
| Sign in | Available | |
| Sign up | Available | |
| Product catalog | Available | Default implementation uses /v2/storefront/products endpoint for filtering, it's advisable to use ElasticSearch for best performance | Product details page | Available | |
| Account | Partial | Requires Spree 4.2 |
| Account - saved addresses | Available | Requires Spree 4.2 |
| Account - reset password | Coming soon | VSF doesn't contain pages for resetting password, but we'll provide composables for handling this logic |
| Account - order history | Available | |
| Cart | Partial | Fully functional, except associating guest order after registration/login. This will be added in the next version of Spree's API. |
| Checkout | Available | |
| Checkout - Shipping methods | Available | |
| Checkout - Payment methods | Partial | Only "Cash" supported out of the box. Additional changes need to be made in backend to support OOB support for providers like Stripe. This will be available in the next version of Spree's API. |
| Wishlists | Coming soon | This will be integrated with the API provided by the latest version of spree_wishlist |
| Multi-currency support | Coming soon | Requires Spree 4.2 |

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
