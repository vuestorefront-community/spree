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
        spreeFeatures: defaultFeatures.spree43
      }
    }
  }
};
