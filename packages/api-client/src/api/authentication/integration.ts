import { AuthIntegration } from '../../types';

const oauthTokenCookieName = 'spree-bearer-token';
const cartTokenCookieName = 'spree-cart-token';

export default function createAuthIntegration(req, res): AuthIntegration {
  const currentOAuthSerializedToken = req.cookies[oauthTokenCookieName];
  const currentOAuthToken = currentOAuthSerializedToken ? JSON.parse(currentOAuthSerializedToken) : null;
  const currentBearerToken = currentOAuthToken?.access_token;

  const currentCartToken = req.cookies[cartTokenCookieName];

  return {
    getOAuthToken: () => {
      if (currentOAuthToken) {
        res.cookie(oauthTokenCookieName, currentOAuthSerializedToken);
      }

      return currentOAuthToken;
    },

    changeOAuthToken: (newToken) => {
      if (!currentBearerToken || currentBearerToken !== newToken.access_token) {
        res.cookie(oauthTokenCookieName, JSON.stringify(newToken));
        res.clearCookie(cartTokenCookieName);
      }
    },

    removeOAuthToken: () => {
      res.clearCookie(oauthTokenCookieName);
    },

    getCartToken: () => {
      if (currentCartToken) {
        res.cookie(cartTokenCookieName, currentCartToken);
      }

      return currentCartToken;
    },

    changeCartToken: (newToken) => {
      if (!currentCartToken || currentCartToken !== newToken) {
        res.cookie(cartTokenCookieName, newToken);
      }
    },

    removeCartToken: () => {
      res.clearCookie(cartTokenCookieName);
    }
  };
}
