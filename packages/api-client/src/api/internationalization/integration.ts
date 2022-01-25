import { InternationalizationIntegration } from '../../types';

const currencyCookieName = 'vsf-spree-currency';

export default function createInternationalizationIntegration(req, res): InternationalizationIntegration {
  const currentCurrency = req.cookies[currencyCookieName];

  return {
    getCurrency: () => {
      if (currentCurrency) {
        res.cookie(currencyCookieName, currentCurrency);
      }

      return currentCurrency;
    }
  }
}
