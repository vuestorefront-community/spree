import { ApiContext } from '../../types';

export default async function removeCoupon({ client, config }: ApiContext, { token, couponCode }): Promise<void> {
  const currency = await config.internationalization.getCurrency();
  const result = await client.cart.removeCouponCode({ orderToken: token }, { ...couponCode, currency });

  if (result.isFail()) {
    throw result.fail();
  }
}
