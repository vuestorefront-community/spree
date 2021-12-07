import axios from 'axios';
import { ApiContext, GetCartParams } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async function changeCurrency({ config }: ApiContext, { currency }: GetCartParams) {
  try {
    const token = await getCurrentCartToken(config);
    const response = await axios.patch(
      `${config.backendUrl}/api/v2/storefront/cart/change_currency?currency=EUR`,
      {
        headers: {
          'X-Spree-Order-Token': token.orderToken
        },
        params: {
          currency: 'USD'
        }
      },
    );

    console.log('response2', response)

    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
