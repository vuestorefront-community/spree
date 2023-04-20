import type { RequiredAccountToken } from '@spree/storefront-api-v2-sdk';
import { Logger } from '@vue-storefront/core';
import { ApiContext, Shipment } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeShipment } from '../serializers/shipping';

export default async function getShipments({ client, config }: ApiContext): Promise<Shipment[]> {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config }) as RequiredAccountToken;
    const currency = await config.internationalization.getCurrency();
    const result = await client.checkout.shippingRates({ ...token, currency });

    if (result.isSuccess()) {
      const payload = result.success();
      const shipments = payload.data.map(e => deserializeShipment(e, payload.included));

      return shipments;
    } else {
      throw result.fail();
    }
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
