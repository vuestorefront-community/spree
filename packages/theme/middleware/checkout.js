const cartEmpty = cart => cart.itemCount === 0
const canEnterBilling = cart => Boolean(cart.address?.shipping) && cart.lineItems.length;
const canEnterPayment = cart => Boolean(cart.address?.billing) && Boolean(cart.address?.shipping) && cart.lineItems.length;

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const cart = await $vsf.$spree.api.getCart();

  switch (currentPath) {
    case 'shipping':
      if (cartEmpty(cart)){
        app.context.redirect('/');
      }
      break;
    case 'billing':
      if (!canEnterBilling(cart)) {
        app.context.redirect('/checkout/shipping');
      }
      break;
    case 'payment':
      if (!canEnterBilling(cart)) {
        app.context.redirect('/checkout/shipping');
      } else if (!canEnterPayment(cart)) {
        app.context.redirect('/checkout/billing');
      }
      break;
  }
};
