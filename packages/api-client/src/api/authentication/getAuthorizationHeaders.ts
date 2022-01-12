import { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token';

const orderTokenHeaderName = 'X-Spree-Order-Token';

export default function getAuthorizationHeaders(token: IToken): { [headerName: string]: string } {
  if (token.bearerToken) {
    return { Authorization: `Bearer ${token.bearerToken}` };
  } else if (token.orderToken) {
    return { [orderTokenHeaderName]: token.orderToken };
  } else {
    return {};
  }
}
