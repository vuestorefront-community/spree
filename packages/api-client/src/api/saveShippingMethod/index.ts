import { ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async ({ client, config }: ApiContext, { selectedShippingRates }) => {
  try {
    const token = await getCurrentCartToken(config);
    const result = await client.checkout.orderUpdate(token, {
      order: {
        shipments_attributes: Object.entries(selectedShippingRates).map(([shipmentId, shippingRateId]: [string, number]) => ({
          id: shipmentId,
          selected_shipping_rate_id: shippingRateId.toString()
        }))
      }
    });

    if (result.isFail()) {
      throw result.fail();
    }

    const advancedCheckoutResult = await client.checkout.advance(token);

    if (advancedCheckoutResult.isFail()) {
      throw result.fail();
    }

    return advancedCheckoutResult.success().data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
