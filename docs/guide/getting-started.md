# Getting Started

## Requirements

- Node 14.15+
- Spree-based store with V2 API available (4.5 preferred for full feature support). Some API endpoints used by the integration are only available in Spree 4.2+, so you may need to either upgrade the store or backport these features to your backend.
- Spree Gateway 3.9.4+

## Quick setup

Clone the Spree integration repository and install required dependencies:
```sh
git clone https://github.com/vuestorefront/spree.git

yarn install
```

### Connecting integration to Spree
By default, the Vue Storefront application will connect to the API at https://demo.spreecommerce.org. You can change it by setting the `BACKEND_URL` env variable:
```sh
export BACKEND_URL=https://demo.spreecommerce.org
```
Alternatively via `.env.development` file:
```
BACKEND_URL=https://demo.spreecommerce.org
```

### Running the application

Now you can build all three projects:
```sh
yarn build
```

If everything built properly, you can start working on your new frontend with:
```sh
yarn dev
```

Changing some parts of the code (notably the `api-client`) will trigger a re-build but the change will not be hot-reloaded. To ensure that the app sees you changes, re-run either `yarn build` or `yarn dev`.
