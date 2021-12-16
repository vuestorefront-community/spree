const canEnterBilling = cart => Boolean(cart.address?.shipping) && cart.lineItems.length;

const canEnterPayment = cart => Boolean(cart.address?.billing) && Boolean(cart.address?.shipping) && cart.lineItems.length;

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const cart = await $vsf.$spree.api.getCart();

  if (!cart) return;

  switch (currentPath) {
    case 'billing':
      if (!canEnterBilling(cart)) {
        app.context.redirect('/');
      }
      break;
    case 'payment':
      if (!canEnterPayment(cart)) {
        app.context.redirect('/');
      }
      break;
  }
};
