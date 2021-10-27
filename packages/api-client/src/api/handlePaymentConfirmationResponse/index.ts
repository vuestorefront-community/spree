import axios from 'axios';
import { ApiContext } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async function handlePaymentConfirmationResponse({ config }: ApiContext, { confirmationResponse }) {
  try {
    const token = await getCurrentCartToken(config);
    const endpoint = config.backendUrl.concat('/api/v2/storefront/intents/handle_response');
    const response = await axios.post(
      endpoint,
      { response: confirmationResponse },
      {
        headers: {
          'X-Spree-Order-Token': token.orderToken
        }
      }
    );

    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
