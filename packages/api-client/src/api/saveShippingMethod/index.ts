import { Logger } from '@vue-storefront/core';
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeCartShipments } from '../serializers/shipping';

export default async ({ client, config }: ApiContext, { selectedShippingRates }) => {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const currency = await config.internationalization.getCurrency();
    const result = await client.checkout.orderUpdate(token, {
      order: {
        shipments_attributes: Object.entries(selectedShippingRates).map(([shipmentId, shippingRateId]: [string, number]) => ({
          id: shipmentId,
          selected_shipping_rate_id: shippingRateId.toString()
        }))
      },
      currency,
      include: 'shipments,shipments.shipping_rates'
    });

    if (result.isFail()) {
      throw result.fail();
    }

    const advancedCheckoutResult = await client.checkout.advance(token);

    if (advancedCheckoutResult.isFail()) {
      throw result.fail();
    }

    return deserializeCartShipments(result.success().included);
  } catch (e) {
    Logger.error(e);
    throw e;
  }
};
