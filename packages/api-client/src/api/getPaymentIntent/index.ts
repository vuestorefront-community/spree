import axios from 'axios';
import { ApiContext, PaymentIntent } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';
import { Logger } from '@vue-storefront/core';

export default async function getPaymentIntent({ client, config }: ApiContext, methodId: number): Promise<PaymentIntent> {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const currency = await config.internationalization.getCurrency();
    const endpoint = config.backendUrl.concat('/api/v2/storefront/intents/create');
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
      clientSecret: response.data.client_secret
    };
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}
