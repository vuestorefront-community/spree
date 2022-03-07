import { ApiContext, ApplyCouponParams } from '../../types';
import { serializeCouponCode } from '../serializers/cart';

export default async function applyCoupon({ client, config }: ApiContext, { token, couponCode }: ApplyCouponParams): Promise<void> {
  const currency = await config.internationalization.getCurrency();
  const result = await client.cart.applyCouponCode({ orderToken: token }, { ...serializeCouponCode(couponCode), currency });

  if (result.isFail()) {
    throw result.fail();
  }
}
