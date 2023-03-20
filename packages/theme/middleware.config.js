require('dotenv').config({ path: `./../../.env.${process.env.NODE_ENV}` });

const defaultFeatures = {
  spree43: {
    associateGuestCart: true,
    fetchPrimaryVariant: true,
    useMenuApi: false
  },
  spree44: {
    associateGuestCart: true,
    fetchPrimaryVariant: true,
    useMenuApi: true
  },
  spree45: {
    associateGuestCart: true,
    fetchPrimaryVariant: true,
    useMenuApi: true
  }
};

module.exports = {
  integrations: {
    spree: {
      location: '@vue-storefront/spree-api/server',
      configuration: {
        backendUrl: process.env.BACKEND_URL,
        assetsUrl: process.env.ASSETS_URL,
        spreeFeatures: {
          ...defaultFeatures[process.env.SPREE_VERSION || 'spree45'],
          // Accepted wishlist values:
          // 'enabled' (Spree 4.4+)
          // 'legacy' (Spree older than 4.4 with spree_wishlist gem installed)
          // 'disabled' (Spree older than 4.4 without spree_wishlist gem)
          wishlist: 'disabled'
        }
      }
    }
  }
};
