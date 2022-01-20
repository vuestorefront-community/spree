export default ({ app }) => {
  const localeCookie = app.$cookies.get('vsf-locale');
  const currencyCookie = app.$cookies.get('vsf-currency') || 'USD';
  const locale = localeCookie || app.i18n.defaultLocale;

  app.i18n.setNumberFormat(locale, {
    currency: {
      style: 'currency',
      currency: currencyCookie,
      currencyDisplay: 'symbol',
      currencyDefault: app.i18n.numberFormats[locale].currency.currencyDefault
    }
  });

  if (!localeCookie){
    app.$cookies.set('vsf-locale', locale)
  }
  app.i18n.setLocale(locale);
}
