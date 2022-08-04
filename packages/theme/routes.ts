import { NuxtRouteConfig } from '@nuxt/types/config/router';
import { resolve } from 'path';

export const getRoutes = (themeDir = __dirname): NuxtRouteConfig[] => {
  return [
    {
      name: 'Checkout',
      path: '/checkout',
      component: resolve(themeDir, '_theme/pages/Checkout.vue'),
      chunkName: '_theme/pages/Checkout',
      children: [
        {
          name: 'Checkout-Shipping',
          path: 'shipping',
          component: resolve(themeDir, '_theme/pages/Checkout/Shipping.vue'),
          chunkName: '_theme/pages/Checkout/Shipping'
        },
        {
          name: 'Checkout-Billing',
          path: 'billing',
          component: resolve(themeDir, '_theme/pages/Checkout/Billing.vue'),
          chunkName: '_theme/pages/Checkout/Billing'
        },
        {
          name: 'Checkout-Payment',
          path: 'payment',
          component: resolve(themeDir, '_theme/pages/Checkout/Payment.vue'),
          chunkName: '_theme/pages/Checkout/Payment'
        },
        {
          name: 'Checkout-ThankYou',
          path: 'thank-you',
          component: resolve(themeDir, '_theme/pages/Checkout/ThankYou.vue'),
          chunkName: '_theme/pages/Checkout/ThankYou'
        }
      ]
    },
    {
      name: 'Content',
      path: '/content/:slug?',
      component: resolve(themeDir, '_theme/pages/Content/_slug.vue'),
      chunkName: '_theme/pages/Content/_slug'
    },
    {
      name: 'MyAccount',
      path: '/my-account',
      component: resolve(themeDir, '_theme/pages/MyAccount.vue'),
      chunkName: '_theme/pages/MyAccount.vue',
      children: [
        {
          name: 'MyAccount-Page',
          path: '/my-account/:pageName?',
          component: resolve(themeDir, '_theme/pages/MyAccount.vue'),
          chunkName: '_theme/pages/MyAccount.vue'
        },
        {
          name: 'MyAccount-Subpage',
          path: '/my-account/:pageName/:id?',
          component: resolve(themeDir, '_theme/pages/MyAccount.vue'),
          chunkName: '_theme/pages/MyAccount.vue'
        }
      ]
    },
    {
      name: 'Category',
      path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
      component: resolve(themeDir, '_theme/pages/Category.vue'),
      chunkName: '_theme/pages/Category'
    },
    {
      name: 'Home',
      path: '/home',
      component: resolve(themeDir, '_theme/pages/Home.vue'),
      chunkName: '_theme/pages/Home'
    },
    {
      name: 'Product',
      path: '/products/:slug/',
      component: resolve(themeDir, '_theme/pages/Product.vue'),
      chunkName: '_theme/pages/Product'
    },
    {
      name: 'ResetPassword',
      path: '/reset_password',
      component: resolve(themeDir, '_theme/pages/ResetPassword.vue'),
      chunkName: '_theme/pages/ResetPassword'
    }
  ];
};
