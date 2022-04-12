<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category}`"
      :label="category"
      :link="localePath(`/c/categories/${category}`)"
    />
  </div>
  <SfModal v-else-if="isCategoryTreeOrMenuAvailable" :visible="isMobileMenuOpen">
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
              label="All"
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
</template>

<script>
import { SfMenuItem, SfModal, SfAccordion, SfList } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { computed, onMounted, ref } from '@nuxtjs/composition-api';
import { facetGetters, useFacet } from '@vue-storefront/spree';
import { useVSFContext } from '@vue-storefront/core';

export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
    SfAccordion,
    SfList
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { $spree } = useVSFContext();
    const { result } = useFacet();
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const menu = ref({});
    const categoryTree = computed(() => facetGetters.getCategoryTree(result.value));
    const categories = ['women', 'men'];
    const isCategoryTreeOrMenuAvailable = computed(() => categoryTree.value?.items?.length > 0 || !menu.value.isDisabled);
    const locale = ref(context.root.$cookies.get('vsf-locale'));

    const getRoute = (category) => {
      if (menu.value.isDisabled) {
        return '/c/' + category.slug;
      }
      return category.link;
    };

    onMounted(async () => {
      try {
        menu.value = await $spree.api.getMenus({menuType: 'header', menuName: 'Main menu', locale: locale.value});
      } catch (e) {
        console.error(e);
      }
    });

    return {
      isCategoryTreeOrMenuAvailable,
      categoryTree,
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
      menu,
      getRoute
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
