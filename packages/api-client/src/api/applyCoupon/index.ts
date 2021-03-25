/* eslint-disable camelcase */

import { ApiContext } from '../../types';

export default async function applyCoupon({ client, config }: ApiContext, { couponCode }): Promise<void> {
  const bearerToken = await config.auth.getToken();
  const result = await client.cart.applyCouponCode({ bearerToken }, { coupon_code: couponCode });

  if (result.isFail()) {
    throw result.fail();
  }
}
