import { getRoutes } from './routes';
import theme from './themeConfig';
import webpack from 'webpack';
import * as dotenv from 'dotenv';
import urlJoin from 'url-join';
import getStore from './getStore';

dotenv.config({ path: `./../../.env.${process.env.NODE_ENV}` });

const serverConfig = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  backendUrl: process.env.BACKEND_URL
};

export default async () => {
  const store = await getStore({
    backendUrl: serverConfig.backendUrl
  });

  return {
    ssr: true,
    server: {
      port: serverConfig.port,
      host: serverConfig.host
    },
    head: {
      title: store.name || 'Vue Storefront',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: store.metaDescription || ''
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'crossorigin'
        },
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
          as: 'style'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
          media: 'print',
          onload: 'this.media=\'all\'',
          once: true
        }
      ]
    },
    loading: { color: '#fff' },
    plugins: ['~/plugins/i18n.js'],
    buildModules: [
      // to core
      '@nuxtjs/composition-api/module',
      '@nuxt/typescript-build',
      '@nuxtjs/google-fonts',
      '@nuxtjs/pwa',
      '@nuxtjs/style-resources',
      ['@vue-storefront/spree/nuxt', {}],
      ['@vue-storefront/nuxt', {
        // @core-development-only-start
        coreDevelopment: true,
        // @core-development-only-end
        useRawSource: {
          dev: [
            '@vue-storefront/spree',
            '@vue-storefront/core'
          ],
          prod: [
            '@vue-storefront/spree',
            '@vue-storefront/core'
          ]
        },
        logger: {
          verbosity: process.env.NODE_ENV === 'development' ? 'debug' : 'error'
        }
      }],
      // @core-development-only-start
      ['@vue-storefront/nuxt-theme', {
        generate: {
          replace: {
            apiClient: '@vue-storefront/spree-api',
            composables: '@vue-storefront/spree'
          }
        }
      }]
      // @core-development-only-end
      /* project-only-start
      ['@vue-storefront/nuxt-theme'],
      project-only-end */
    ],
    modules: [
      ['@vue-storefront/nuxt', {
        i18n: {
          useNuxtI18nModule: true
        }
      }],
      ['nuxt-i18n', {
        baseUrl: serverConfig.baseUrl
      }],
      'cookie-universal-nuxt',
      'vue-scrollto/nuxt',
      '@vue-storefront/middleware/nuxt'
    ],
    i18n: {
      detectBrowserLanguage: false,
      currency: store.defaultCurrency,
      country: 'US',
      strategy: 'prefix_except_default',
      langDir: 'lang/',
      defaultLocale: store.defaultLocale,
      locales: [
        {
          code: 'de',
          iso: 'de-DE',
          label: 'German',
          file: 'de.js'
        },
        {
          code: 'en',
          iso: 'en-US',
          label: 'English',
          file: 'en.js'
        }
      ],
      vueI18n: {
        silentTranslationWarn: false,
        fallbackLocale: store.defaultLocale
      }
    },
    pwa: {
      meta: {
        theme_color: '#5ECE7B'
      }
    },
    googleFonts: {
      families: {
        Raleway: {
          wght: [300, 400, 500, 600, 700],
          ital: [400]
        },
        Roboto: {
          wght: [300, 400, 500, 700],
          ital: [300, 400]
        }
      },
      display: 'swap'
    },
    css: [
      '~/assets/styles.scss'
    ],
    styleResources: {
      scss: [
        require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] }),
        '~/assets/components/*.scss'
      ]
    },
    build: {
      transpile: [
        'vee-validate/dist/rules'
      ],
      plugins: [
        new webpack.DefinePlugin({
          'process.VERSION': JSON.stringify({
            // eslint-disable-next-line global-require
            version: require('./package.json').version,
            lastCommit: process.env.LAST_COMMIT || ''
          })
        })
      ]
    },
    router: {
      middleware: ['checkout'],
      scrollBehavior (_to, _from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        } else {
          return { x: 0, y: 0 };
        }
      },
      extendRoutes(routes) {
        routes.splice(0, routes.length);
        routes.push(...getRoutes());
      }
    },
    publicRuntimeConfig: {
      theme,
      currencies: [
        { code: 'USD', label: 'Dollar' },
        { code: 'EUR', label: 'Euro' }
      ],
      backendUrl: serverConfig.backendUrl,
      middlewareUrl: urlJoin(serverConfig.baseUrl, '/api')
    }
  };
};
