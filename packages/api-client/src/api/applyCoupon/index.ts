import { ApiContext } from '../../types';
import { serializeCouponCode } from '../serializers/cart';

export default async function applyCoupon({ client }: ApiContext, { token, couponCode }): Promise<void> {
  const result = await client.cart.applyCouponCode({ orderToken: token }, serializeCouponCode(couponCode));

  if (result.isFail()) {
    throw result.fail();
  }
}
