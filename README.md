![Vue Storefront](https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067)

# Vue Storefront 2 integration for Spree Commerce

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

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Spree Storefront API Documentation](https://api.spreecommerce.org/docs/api-v2/api/docs/v2/storefront/index.yaml)

## Demo

- [Vue Storefront - Spree demo](https://vuestorefront-spree.upsidelab.io) - demo instance connected to [https://demo.spreecommerce.org](https://demo.spreecommerce.org) APIs
