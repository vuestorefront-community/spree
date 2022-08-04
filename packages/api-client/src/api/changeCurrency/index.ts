import { ApiContext, GetChangeCartParams } from '../../types';
import getCurrentCartToken from '../authentication/getCurrentCartToken';

export default async function changeCurrency({ client, config }: ApiContext, { newCurrency }: GetChangeCartParams) {
  const token = await getCurrentCartToken(config);
  const response = await client.cart.changeCurrency({
    order_token: token.orderToken,
    new_currency: newCurrency
  });
  if (response.isSuccess()) {

    return response.success();
  } else {
    console.log(response.fail());
    throw response.fail();
  }
}
