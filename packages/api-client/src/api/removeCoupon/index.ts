import { ApiContext } from '../../types';
import { RemoveCouponParams } from '../../types';

export default async function removeCoupon(
  { client, config }: ApiContext,
  { token, couponCode }: RemoveCouponParams
): Promise<void> {
  const currency = await config.internationalization.getCurrency();
  const result = await client.cart.removeCouponCode({
    ...token,
    code: couponCode,
    currency
  });

  if (result.isFail()) {
    throw result.fail();
  }
}
