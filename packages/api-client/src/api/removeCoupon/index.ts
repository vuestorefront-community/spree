import { ApiContext } from '../../types';

export default async function removeCoupon({ client }: ApiContext, { token, couponCode }): Promise<void> {
  const result = await client.cart.removeCouponCode({ orderToken: token }, couponCode);

  if (result.isFail()) {
    throw result.fail();
  }
}
