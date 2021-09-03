/* eslint-disable camelcase */

import { ApiContext } from '../../types';

export default async ({ client }: ApiContext, { token, shipmentIds, method }) => {
  try {
    const result = await client.checkout.orderUpdate({ orderToken: token }, {
      order: {
        shipments_attributes: shipmentIds.map((id) => ({
          id,
          selected_shipping_rate_id: method
        }))
      }
    });

    if (result.isFail()) {
      throw result.fail();
    }

    const advancedCheckoutResult = await client.checkout.advance({ orderToken: token });

    if (advancedCheckoutResult.isFail()) {
      throw result.fail();
    }

    return advancedCheckoutResult.success().data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
