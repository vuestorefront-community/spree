import { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';

const orderTokenHeaderName = 'X-Spree-Order-Token';

export default function getAuthenticationHeaders(token: IToken): { [headerName: string]: string } {
  if (token.bearerToken) {
    return { Authentication: `Bearer ${token.bearerToken}` };
  } else if (token.orderToken) {
    return { [orderTokenHeaderName]: token.orderToken };
  } else {
    return {};
  }
}
