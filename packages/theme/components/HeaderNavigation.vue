<template>
  <div>
    <div class="sf-header__navigation desktop-only">
      <template v-if="isCategoryTreeOrMenuAvailable">
        <SfHeaderNavigationItem
          v-for="(category, index) in ((menu && menu.items) || (categoryTree && categoryTree.items))"
          :key="index"
          class="nav-item"
          v-e2e="`app-header-url_${category.name || category.label}`"
          :label="category.name || category.label"
          :link="isExternalLink(category) ? category.link : getRoute(category)"
        />
      </template>
      <template v-else>
        <SfHeaderNavigationItem
          v-for="(category, index) in categories"
          :key="index"
          class="nav-item"
          v-e2e="`app-header-url_${category}`"
          :label="category"
          :link="localePath(`/c/categories/${category}`)"
        />
      </template>
    </div>
    <SfModal v-if="isCategoryTreeOrMenuAvailable" :visible="isMobileMenuOpen">
      <SfAccordion open="" :multiple="false" transition="" showChevron>
        <SfAccordionItem
          v-for="(cat, i) in ((menu && menu.items) || (categoryTree && categoryTree.items))"
          :key="i"
          class="nav-item"
          :header="cat.name || cat.label"
        >
          <SfList>
            <SfListItem>
              <SfMenuItem
                :label="$t('components.header_navigation.all')"
                class="sf-header-navigation-item__menu-item"
                :link="localePath(getRoute(cat))"
                @click.native="toggleMobileMenu"
              />
            </SfListItem>
            <SfListItem
              v-for="(subCat, j) in cat.items"
              :key="j">
              <SfMenuItem
                :label="subCat.name || subCat.label"
                class="sf-header-navigation-item__menu-item"
                :link="localePath(getRoute(subCat))"
                @click.native="toggleMobileMenu"
              />
            </SfListItem>
          </SfList>
        </SfAccordionItem>
      </SfAccordion>
    </SfModal>
    <SfModal v-else :visible="isMobileMenuOpen">
      <SfHeaderNavigationItem
        v-for="(category, index) in categories"
        :key="index"
        class="nav-item"
        v-e2e="`app-header-url_${category}`"
      >
        <template #mobile-navigation-item>
          <SfMenuItem
            :label="category"
            class="sf-header-navigation-item__menu-item"
            :link="localePath(`/c/categories/${category}`)"
            @click.native="toggleMobileMenu"
          />
        </template>
      </SfHeaderNavigationItem>
    </SfModal>
  </div>
</template>

<script>
import { SfMenuItem, SfModal, SfAccordion, SfList } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { computed } from '@nuxtjs/composition-api';
import {facetGetters, useFacet, useMenus} from '@vue-storefront/spree';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
    SfAccordion,
    SfList
  },
  setup(props, context) {
    const { result } = useFacet();
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { menu, loadMenu } = useMenus('header');
    const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));
    const categories = ['women', 'men'];
    const isCategoryTreeOrMenuAvailable = computed(() => categoryTree.value?.items?.length > 0 || !menu.value.isDisabled);
    const { locale } = context.root.$i18n;

    const getRoute = (category) => {
      if (category.slug) return `/c/${category.slug}`;
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
      isCategoryTreeOrMenuAvailable,
      categoryTree,
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
      menu,
      getRoute,
      isExternalLink
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>
