<template>
  <div>
    <DesktopMenu v-bind="{ menu, isMenuAvailable, getRoute, isExternalLink }" />
    <MobileMenu v-bind="{ menu, isMenuAvailable, getRoute, isExternalLink }" />
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
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
  setup(context) {
    const { menu, loadMenu } = useMenus('header');
    const isMenuAvailable = computed(() => !menu.value.isDisabled);
    const { locale } = context.root.$i18n;

    const getRoute = (category) => {
      if (category.link) return category.link.replace('/t', '/c');
      return '/';
    };
    const isExternalLink = (category) => {
      return category.link && (category.link.includes('https://') || category.link.includes('http://'));
    };

    onSSR(async () => {
      await loadMenu({menuType: 'header', menuName: 'Main Menu', locale: locale});
    });

    return {
      isMenuAvailable,
      menu,
      getRoute,
      isExternalLink
    };
  }
};
</script>
