import { ApiContext, CouponCode } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';

export default async function removeCoupon({ client, config }: ApiContext, { couponCode }: CouponCode): Promise<void> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const result = await client.cart.removeCouponCode(token, couponCode);

  if (result.isFail()) {
    throw result.fail();
  }
}
