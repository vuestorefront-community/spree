export default ({ app }) => {
    const localeCookie = app.$cookies.get('vsf-locale');
    const locale = localeCookie || app.i18n.defaultLocale;

    if (!localeCookie){
      app.$cookies.set('vsf-locale', locale)
    }
    app.i18n.setLocale(locale);
}
