import type { OptionalAnyToken, IToken } from '@spree/storefront-api-v2-sdk';

// This function is a migration helper
// It will be removed once all the endpoints handle the new token interface

function toOldToken (token: OptionalAnyToken): IToken {
  if (token.bearer_token) return { bearerToken: token.bearer_token };
  if (token.order_token) return { orderToken: token.order_token };
  return {};
}

export default toOldToken;
