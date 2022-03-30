export default async ({ app, $vsf }) => {
  const raisePageNotFoundError = () => {
    app.context.error({ statusCode: 404, message: 'Order details not found' });
  };

  const { pageName, id: orderId } = app.context.route.params;
  if (pageName !== 'order-details') return;
  if (!orderId) return raisePageNotFoundError();

  const order = await $vsf.$spree.api.getOrder({ orderId });
  if (!order) return raisePageNotFoundError();
};
