import { ApiContext, CouponCode } from '../../types';

export default async function removeCoupon({ client, config }: ApiContext, { couponCode }: CouponCode): Promise<void> {
  const bearerToken = await config.auth.getToken();
  const result = await client.cart.removeCouponCode({ bearerToken }, couponCode);

  if (result.isFail()) {
    throw result.fail();
  }
}
