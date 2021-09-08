import { ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';
import { deserializeShipment } from '../serializers/shipping';

export default async function getShipments({ client, config }: ApiContext) {
  try {
    const token = await getCurrentCartToken(config);
    const result = await client.checkout.shippingMethods(token);

    if (result.isSuccess()) {
      const payload = result.success();
      const shipments = payload.data.map(e => deserializeShipment(e, payload.included));

      return shipments;
    } else {
      throw result.fail();
    }
  } catch (e) {
    console.error('getShipments:', e);
    throw e;
  }
}
