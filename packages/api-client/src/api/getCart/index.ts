import { ApiContext } from '../../types';

export default async function getCart({ client, config }: ApiContext) {
  const bearerToken = await config.auth.getToken();
  const result = await client.cart.show({ bearerToken });

  if (result.isSuccess()) {
    return result.success().data;
  } else {
    const error = result.fail();
    const serverResponse = error.serverResponse;
    if (serverResponse && serverResponse.status === 404) {
      const createCartResult = await client.cart.create({ bearerToken });

      if (createCartResult.isSuccess()) {
        return createCartResult.success().data;
      } else {
        return {};
      }
    }

    // throw result.fail();
    return {};
  }
}
