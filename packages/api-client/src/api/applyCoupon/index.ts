import { ApiContext, CouponCode } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import { serializeCouponCode } from '../serializers/cart';

export default async function applyCoupon({ client, config }: ApiContext, couponCode: CouponCode): Promise<void> {
  const token = await getCurrentBearerOrCartToken({ client, config });
  const result = await client.cart.applyCouponCode(token, serializeCouponCode(couponCode));

  if (result.isFail()) {
    throw result.fail();
  }
}
