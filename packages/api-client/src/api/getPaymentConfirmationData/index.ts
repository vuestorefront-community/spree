import axios from 'axios';
import { ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async function getPaymentConfirmationData({ config }: ApiContext) {
  try {
    const token = await getCurrentCartToken(config);
    const endpoint = config.backendUrl.concat('/api/v2/storefront/intents/payment_confirmation_data');
    const response = await axios.post(
      endpoint,
      {},
      {
        headers: {
          'X-Spree-Order-Token': token.orderToken
        }
      }
    );

    return { clientSecret: response.data.client_secret };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
