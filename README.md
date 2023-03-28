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
- Spree 4.3+

## Deploy in the cloud

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
## Getting Started

The easiest way to setup a new Spree + Vue Storefront setup, is to follow out [Quick Start Guide](https://dev-docs.spreecommerce.org/getting-started/quick-start-guide).

Simply run the Spree CLI and follow the instructions:

```sh
npx @spree/cli new app
```

## Manually adding Vue Storefront to an existing Spree project

1. Clone this repository
```sh
git clone https://github.com/vuestorefront/spree.git
```

2. Set backend URL via env variable
```sh
export BACKEND_URL=https://demo.spreecommerce.org
```
Or via `.env.development` file:
```
BACKEND_URL=https://demo.spreecommerce.org
```

3. Then install dependencies and build the required packages

```sh
bin/setup
```

5. If everything built properly, you can start working on your new frontend with:

```sh
bin/start
```

Changing some parts of the code (notably the `api-client`) will trigger a re-build but the change will not be hot-reloaded. To ensure that the app sees you changes, re-run either `yarn build` or `yarn dev`.

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

## Serving under a subpath

You might want to serve your store under a subpath (for example: `https://example.com/shop/`). In order to do that, you just have to add a `BASE_URL` environment variable to the `.env.production` file containing a full url.

Note that in development it will still be served on the root path (`http://localhost:3000` by default) unless you change the `.env.development` file too.

## Repository structure

The monorepo contains three submodules:
- api-client - low level backend API connector, utilizing Spree's v2 Storefront API
- composables - reusable business logic
- theme - Nuxt.js-based frontend application

For more details, refer to the official [project structure](https://docs.vuestorefront.io/v2/getting-started/project-structure.html).


## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Spree Storefront API Documentation](https://api.spreecommerce.org/docs/api-v2/api/docs/v2/storefront/index.yaml)

## Demo

- [Vue Storefront - Spree demo](https://vuestorefront-spree.upsidelab.io) - demo instance connected to [https://demo.spreecommerce.org](https://demo.spreecommerce.org) APIs
