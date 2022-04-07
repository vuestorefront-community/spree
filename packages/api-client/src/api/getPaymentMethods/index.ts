import axios from 'axios';
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { deserializePaymentMethods } from '../serializers/payment';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';
import { Logger } from '@vue-storefront/core';

export default async function getPaymentMethods({ client, config }: ApiContext) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    // TODO check if new spree sdk supports additional params here
    const currency = await config.internationalization.getCurrency();

    const response = await axios.get(
      `${config.backendUrl}/api/v2/storefront/checkout/payment_methods`,
      {
        params: {
          currency: currency
        },
        headers: getAuthorizationHeaders(token)
      }
    );
    return response.data.data.map(deserializePaymentMethods);
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
