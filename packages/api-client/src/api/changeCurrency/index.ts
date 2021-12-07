import axios from 'axios';
import { ApiContext, GetChangeCartParams } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async function changeCurrency({ config }: ApiContext, { currency, newCurrency }: GetChangeCartParams) {
  try {
    const token = await getCurrentCartToken(config);
    const response = await axios.patch(
      `${config.backendUrl}/api/v2/storefront/cart/change_currency?currency=${currency}`,
      {
        new_currency: newCurrency
      },
      {
        headers: {
          'X-Spree-Order-Token': token.orderToken
        }
      },
    )

    return response.data;
  } catch (e) {
    throw e;
  }
}
