import { ApiContext, CouponCode } from '../../types';
import getCurrentBearerToken from '../authentication/getCurrentBearerToken';
import { serializeCouponCode } from '../serializers/cart';

export default async function applyCoupon({ client, config }: ApiContext, couponCode: CouponCode): Promise<void> {
  const bearerToken = await getCurrentBearerToken({ client, config });
  const result = await client.cart.applyCouponCode({ bearerToken }, serializeCouponCode(couponCode));

  if (result.isFail()) {
    throw result.fail();
  }
}
