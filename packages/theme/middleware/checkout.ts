import { Logger } from '@vue-storefront/core';

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];
  if (!currentPath) return;

  const tryToGetShipments = async () => {
    try {
      return await $vsf.$spree.api.getShipments();
    } catch (err) {
      Logger.error('checkout-middleware/tryToGetShipments', err);
    }
    return null;
  };

  const getCart = async () => {
    return await $vsf.$spree.api.getCart();
  };

  const redirectWithLocalePath = (path) => {
    app.context.redirect(app.localePath(path));
  };

  const checks = await (async () => {
    const [shipments, cart] = await Promise.all([tryToGetShipments(), getCart()]);
    return {
      isAnyItemInCart: cart?.itemCount,
      isShippingCartFilled: cart?.address?.shipping && cart?.lineItems?.length,
      isAnyShipmentSelected: shipments?.every((method) =>
        method.availableShippingRates.some((rate) => rate.selected)
      ),
      isBillingAddressFilled: cart?.address?.billing
    };
  })();

  const canEnterShipping = checks.isAnyItemInCart;
  const canEnterBilling =
    canEnterShipping &&
    checks.isShippingCartFilled &&
    checks.isAnyShipmentSelected;
  const canEnterPayment = canEnterBilling && checks.isBillingAddressFilled;

  switch (currentPath) {
    case 'shipping':
      if (canEnterShipping) return;
      redirectWithLocalePath('/');
      break;
    case 'billing':
      if (canEnterBilling) return;
      redirectWithLocalePath('/checkout/shipping');
      break;
    case 'payment':
      if (canEnterPayment) return;
      if (canEnterBilling) return redirectWithLocalePath('/checkout/billing');
      redirectWithLocalePath('/checkout/shipping');
      break;
  }
};
