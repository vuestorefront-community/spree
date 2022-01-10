import axios from 'axios';
import { IOAuthToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';
import { ApiConfig, ApiContext } from '../../types';

async function associateCart(config: ApiConfig, guestCartToken: string, bearerToken: IOAuthToken) {
  await axios.patch(
    `${config.backendUrl}/api/v2/storefront/cart/associate?guest_order_token=${guestCartToken}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${bearerToken.access_token}`
      }
    }
  );
}

export default async function logIn({ client, config }: ApiContext, params): Promise<void> {
  const { username, password, guestCartToken } = params;

  const response = await client.authentication.getToken({ username, password });

  if (response.isSuccess()) {
    const bearerToken = response.success();
    await config.auth.changeOAuthToken(bearerToken);

    if (config.spreeFeatures.associateGuestCart && guestCartToken) {
      await associateCart(config, guestCartToken, bearerToken);
    }
  } else {
    throw response.fail();
  }
}
