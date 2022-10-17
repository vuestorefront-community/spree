<template>
  <div>
    <SfModal v-if="isMenuAvailable" :visible="isMobileMenuOpen">
      <SfAccordion open="" :multiple="false" transition="" showChevron>
        <template v-for="(cat, i) in menu && menu.items">
          <SfMenuItem
            v-if="isExternalLink(cat)"
            :key="i"
            :label="cat.name || cat.label"
            class="sf-accordion-item__header"
            :link="cat.link"
          />
          <SfAccordionItem
            v-else
            :key="i"
            class="nav-item"
            :header="cat.name || cat.label"
          >
            <SfList>
              <SfListItem>
                <SfMenuItem
                  :label="$t('components.header_navigation.all')"
                  class="sf-header-navigation-item__menu-item"
                  :link="getRoute(cat)"
                  @click.native="toggleMobileMenu"
                />
              </SfListItem>
              <SfListItem
                v-for="(subCat, j) in cat.items"
                :key="j">
                <SfMenuItem
                  :label="subCat.name || subCat.label"
                  class="sf-header-navigation-item__menu-item"
                  :link="getRoute(subCat)"
                  @click.native="toggleMobileMenu"
                />
              </SfListItem>
            </SfList>
          </SfAccordionItem>
        </template>
      </SfAccordion>
    </SfModal>
    <SfModal v-else :visible="isMobileMenuOpen">
      The menu will show up here once it's configured and enabled in middleware.config.js
    </SfModal>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { SfMenuItem, SfModal, SfAccordion, SfList } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

export default {
  name: 'MobileMenu',
  components: {
    SfMenuItem,
    SfModal,
    SfAccordion,
    SfList
  },
  props: {
    menu: {
      type: Object
    },
    getRoute: {
      type: Function
    },
    isExternalLink: {
      type: Function
    }
  },
  setup(props) {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const isMenuAvailable = computed(() => !props.menu.isDisabled);

    return {
      isMenuAvailable,
      isMobileMenuOpen,
      toggleMobileMenu
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
