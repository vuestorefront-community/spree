import { AuthIntegration } from '../../types';

export default function createAuthIntegration(req, res): AuthIntegration {
  const currentSerializedToken = req.cookies['spree-bearer-token'];
  const currentToken = currentSerializedToken ? JSON.parse(currentSerializedToken) : null;
  const currentBearerToken = currentToken?.access_token;

  return {
    changeToken: (newToken) => {
      if (!currentBearerToken || currentBearerToken !== newToken.access_token) {
        res.cookie('spree-bearer-token', JSON.stringify(newToken));
      }
    },
    getOAuthToken: () => {
      res.cookie('spree-bearer-token', currentSerializedToken);
      return currentToken;
    },
    removeToken: () => {
      res.clearCookie('spree-bearer-token');
    }
  };
}
