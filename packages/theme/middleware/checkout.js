const cartEmpty = cart => cart.itemCount === 0;
const canEnterBilling = cart => Boolean(cart.address?.shipping) && cart.lineItems.length;
const canEnterPayment = cart => Boolean(cart.address?.billing) && Boolean(cart.address?.shipping) && cart.lineItems.length;

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const cart = await $vsf.$spree.api.getCart();

  const redirectWithLocalePath = (path) => {
    app.context.redirect(app.localePath(path));
  };

  switch (currentPath) {
    case 'shipping':
      if (cartEmpty(cart)) {
        redirectWithLocalePath('/');
      }
      break;
    case 'billing':
      if (!canEnterBilling(cart)) {
        redirectWithLocalePath('/checkout/shipping');
      }
      break;
    case 'payment':
      if (!canEnterBilling(cart)) {
        redirectWithLocalePath('/checkout/shipping');
      } else if (!canEnterPayment(cart)) {
        redirectWithLocalePath('/checkout/billing');
      }
      break;
  }
};
