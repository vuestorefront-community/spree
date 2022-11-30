import axios from 'axios';
import { ApiContext, BraintreeToken } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';
import { Logger } from '@vue-storefront/core';

export default async function getBraintreeToken({ client, config }: ApiContext, methodId: number): Promise<BraintreeToken> {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const currency = await config.internationalization.getCurrency();
    const endpoint = config.backendUrl.concat('/api/v2/braintree_client_token');
    const response = await axios.post(
      endpoint, {
        currency: currency,
        payment_method_id: methodId
      },
      {
        headers: getAuthorizationHeaders(token)
      }
    );
    return {
      clientToken: response.data.client_token
    };
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
