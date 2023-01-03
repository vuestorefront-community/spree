# Vue Storefront 2 integration with Spree

:::tip There's more
This page only contains the documentation specific to Spree integration. For more information, see the [Vue Storefront documentation](https://docs.vuestorefront.io/v2/).
:::

This project is a Spree integration for Vue Storefront 2.

This integration is currently stable and ready for production usage.
If you'd like to report a bug or contribute to the codebase, please see the [repository issues page](https://github.com/vuestorefront/spree/issues).

## Project structure

The monorepo contains three submodules:
- api-client - low level backend API connector, utilizing Spree's v2 Storefront API
- composables - reusable business logic
- theme - Nuxt.js-based frontend application

For more details, refer to the official [project structure](https://docs.vuestorefront.io/v2/getting-started/project-structure.html).

## Spree backend

Before setting up the Vue Storefront application you will need to have a Spree instance running. The easiest way to start is by using the [Spree CLI](https://dev-docs.spreecommerce.org/getting-started/spree-cli) tool. Once you have the backend running you can follow along with this guide to set up and configure the VSF integration with it.