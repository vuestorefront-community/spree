import axios from 'axios';
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';

export default async function getPaymentConfirmationData({ client, config }: ApiContext) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const endpoint = config.backendUrl.concat('/api/v2/storefront/intents/payment_confirmation_data');
    const response = await axios.post(
      endpoint,
      {},
      {
        headers: getAuthorizationHeaders(token)
      }
    );

    return { clientSecret: response.data.client_secret };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
