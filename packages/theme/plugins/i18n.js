import { VSF_LOCALE_COOKIE } from '@vue-storefront/core';
import { VSF_SPREE_CURRENCY_COOKIE } from '@vue-storefront/spree-api';

export default ({ app, $config }) => {
  const defaultCurrency = $config.theme.defaultCurrency || 'USD';

  const localeCookie = app.$cookies.get(VSF_LOCALE_COOKIE);
  const currencyCookie = app.$cookies.get(VSF_SPREE_CURRENCY_COOKIE);

  if (!currencyCookie) {
    app.$cookies.set(VSF_SPREE_CURRENCY_COOKIE, defaultCurrency);
  }

  const currency = currencyCookie || defaultCurrency;
  const locale = localeCookie || app.i18n.defaultLocale;

  app.i18n.setNumberFormat(locale, {
    currency: {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
      currencyDefault: app.i18n.numberFormats[locale].currency.currencyDefault
    }
  });

  if (!localeCookie) {
    app.$cookies.set(VSF_LOCALE_COOKIE, locale);
  }
};
