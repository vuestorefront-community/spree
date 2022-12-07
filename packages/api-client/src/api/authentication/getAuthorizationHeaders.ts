import type { OptionalAnyToken } from '@spree/storefront-api-v2-sdk';

const orderTokenHeaderName = 'X-Spree-Order-Token';

export default function getAuthorizationHeaders(token: OptionalAnyToken): { [headerName: string]: string } {
  if (token.bearer_token) {
    return { Authorization: `Bearer ${token.bearer_token}` };
  } else if (token.order_token) {
    return { [orderTokenHeaderName]: token.order_token };
  } else {
    return {};
  }
}
