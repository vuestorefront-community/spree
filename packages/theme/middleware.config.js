const defaultFeatures = {
  spree42: {
    // Associate guest cart after the customer logs in. Requires Spree 4.3+
    associateGuestCart: false,
    // Fetch basic information about products from the `primary_variant` relationship. Requires Spree 4.3+
    fetchPrimaryVariant: false
  },
  spree43: {
    associateGuestCart: true,
    fetchPrimaryVariant: true
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
          ...defaultFeatures[process.env.SPREE_VERSION || 'spree43'],
          // Accepted wishlist values:
          // 'enabled' (Spree 4.4+)
          // 'legacy' (Spree older than 4.4 with spree_wishlist gem installed)
          // 'disabled' (Spree older than 4.4 without spree_wishlist gem)
          useMenuApi: false,
          wishlist: 'disabled'
        }
      }
    }
  }
};
