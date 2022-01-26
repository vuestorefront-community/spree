const currencyCookieName = 'vsf-spree-currency';

export default ({ app, $config }) => {
  const defaultCurrency = $config.theme.defaultCurrency || 'USD';

  const localeCookie = app.$cookies.get('vsf-locale');
  const currencyCookie = app.$cookies.get(currencyCookieName);

  if (!currencyCookie) {
    app.$cookies.set(currencyCookieName, defaultCurrency);
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

  if (!localeCookie){
    app.$cookies.set('vsf-locale', locale)
  }
  app.i18n.setLocale(locale);
}
