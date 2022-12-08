<template>
  <div>
    <DesktopMenu v-bind="{ menu, getRoute, isExternalLink }" />
    <MobileMenu v-bind="{ menu, getRoute, isExternalLink }" />
  </div>
</template>

<script>
import { useMenus } from '@vue-storefront/spree';
import { onSSR } from '@vue-storefront/core';
import DesktopMenu from './HeaderNavigation/DesktopMenu.vue';
import MobileMenu from './HeaderNavigation/MobileMenu.vue';

export default {
  name: 'HeaderNavigation',
  components: {
    DesktopMenu,
    MobileMenu
  },
  setup(props, context) {
    const { menu, loadMenu } = useMenus('header');
    const { locale } = context.root.$i18n;

    const getRoute = (category) => {
      if (category.link) return category.link.replace('/t', '/c');
      return '/';
    };
    const isExternalLink = (category) => {
      return category.link && (category.link.includes('https://') || category.link.includes('http://'));
    };

    onSSR(async () => {
      await loadMenu({menuType: 'header', menuName: 'Main Menu', locale });
    });

    return {
      menu,
      getRoute,
      isExternalLink
    };
  }
};
</script>
