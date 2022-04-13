import { VSF_LOCALE_COOKIE } from '@vue-storefront/core';
import { InternationalizationIntegration } from '../../types';

export default function createInternationalizationIntegration(
  req,
  res
): InternationalizationIntegration {
  const currentCurrency = req.cookies['vsf-spree-currency'];
  const currentLocale = req.cookies[VSF_LOCALE_COOKIE];

  return {
    getCurrency: () => {
      if (currentCurrency) {
        res.cookie('vsf-spree-currency', currentCurrency);
      }

      return currentCurrency;
    },

    getLocale: () => {
      if (currentLocale) {
        res.cookie(VSF_LOCALE_COOKIE, currentLocale);
      }

      return currentLocale;
    }
  };
}
