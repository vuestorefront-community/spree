import { Logger } from '@vue-storefront/core';
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializeShipment } from '../serializers/shipping';

export default async function getShipments({ client, config }: ApiContext) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const currency = await config.internationalization.getCurrency();
    const result = await client.checkout.shippingMethods(token, { currency });

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
