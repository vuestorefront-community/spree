import { ApiContext, CouponCode } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';

export default async function removeCoupon({ client, config }: ApiContext, { couponCode }: CouponCode): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  const result = await client.cart.removeCouponCode({ bearerToken }, couponCode);

  if (result.isFail()) {
    throw result.fail();
  }
}
