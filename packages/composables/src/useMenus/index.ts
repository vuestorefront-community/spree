import {
  useVSFContext, sharedRef
} from '@vue-storefront/core';
import { UseMenus } from '../types';
import { computed } from '@nuxtjs/composition-api';

export default function useMenus(id: string): UseMenus {
  const context = useVSFContext();
  const loading = sharedRef(false, `useMenus-loading-${id}`);
  const menu = sharedRef(null, `useMenus-${id}`);
  const error = sharedRef({ load: null, loadMenu: null }, `useMenus-error-${id}`);

  const loadMenu = async ({ menuType, menuName, locale}) => {
    if (menu.value && menu.value.items) {
      loading.value = false;
      error.value.load = null;
      return;
    }

    try {
      loading.value = true;
      menu.value = await context.$spree.api.getMenus({menuType: menuType, menuName: menuName, locale: locale});
      error.value.load = null;
    } catch (e) {
      error.value.load = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    loadMenu,
    error: computed(() => error.value),
    menu: computed(() => menu.value),
    loading: computed(() => loading.value)
  };
}
