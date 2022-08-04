import { VSF_LOCALE_COOKIE } from '@vue-storefront/core';
import { VSF_SPREE_CURRENCY_COOKIE } from '../../';
import { InternationalizationIntegration } from '../../types';

export default function createInternationalizationIntegration(
  req,
  res
): InternationalizationIntegration {
  const currentCurrency = req.cookies[VSF_SPREE_CURRENCY_COOKIE];
  const currentLocale = req.cookies[VSF_LOCALE_COOKIE];

  return {
    getCurrency: () => {
      if (currentCurrency) {
        res.cookie(VSF_SPREE_CURRENCY_COOKIE, currentCurrency);
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
