const GTM_TAG = 'GTM-WMDC3CP';

module.exports = {
  title: 'Vue Storefront 2 for Spree',
  base: '/',
  description: 'Documentation for the Spree connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],

    // Google Tag Manager
    ['script', {}, [`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_TAG}');
    `]],
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
          /**
            Hack for loading images properly.
            ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
           */
          {  ...useRule.options, esModule: false } :
          useRule.options
      }))
    }))
  },
  themeConfig: {
    GTM_TAG,
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Documentation', link: 'https://docs.vuestorefront.io/v2/' },
      { text: 'Demo', link: 'https://vuestorefront-spree.upsidelab.io/' },
      { text: 'GitHub', link: 'https://github.com/vuestorefront/spree/'},
      { text: 'Roadmap', link: 'https://github.com/vuestorefront/spree/blob/main/README.md#feature-support'},
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/guide/getting-started', 'Getting started'],
          ['/guide/configuration', 'Configuration'],
          ['/guide/multi-currency', 'Mult-currency support'],
          ['/guide/about', 'About'],
        ]
      },
      {
        title: 'Composables',
        collapsable: true,
        children: [
          ['/guide/composables/use-billing', 'useBilling'],
          ['/guide/composables/use-cart', 'useCart'],
          ['/guide/composables/use-country', 'useCountry'],
          ['/guide/composables/use-facet', 'useFacet'],
          ['/guide/composables/use-make-order', 'useMakeOrder'],
          ['/guide/composables/use-product', 'useProduct'],
          ['/guide/composables/use-shipping', 'useShipping'],
          ['/guide/composables/use-user', 'useUser']
        ]
      }
    ]
  }
}
