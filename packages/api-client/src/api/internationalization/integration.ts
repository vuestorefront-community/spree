import { InternationalizationIntegration } from '../../types';

const currencyCookieName = 'vsf-spree-currency';
const localeCookieName = 'vsf-locale';

export default function createInternationalizationIntegration(
  req,
  res
): InternationalizationIntegration {
  const currentCurrency = req.cookies[currencyCookieName];
  const currentLocale = req.cookies[localeCookieName];

  return {
    getCurrency: () => {
      if (currentCurrency) {
        res.cookie(currencyCookieName, currentCurrency);
      }

      return currentCurrency;
    },

    getLocale: () => {
      if (currentLocale) {
        res.cookie(localeCookieName, currentLocale);
      }

      return currentLocale;
    }
  };
}
