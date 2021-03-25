import { ApiContext, CouponCode } from '../../types';
import { serializeCouponCode } from '../serializers/cart';

export default async function applyCoupon({ client, config }: ApiContext, couponCode: CouponCode): Promise<void> {
  const bearerToken = await config.auth.getToken();
  const result = await client.cart.applyCouponCode({ bearerToken }, serializeCouponCode(couponCode));

  if (result.isFail()) {
    throw result.fail();
  }
}
