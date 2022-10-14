<template>
  <div class="sf-header__navigation desktop-only">
    <template v-if="isMenuAvailable">
      <SfHeaderNavigationItem
        v-for="(category, index) in menu && menu.items"
        :key="index"
        class="nav-item"
        v-e2e="`app-header-url_${category.name || category.label}`"
        :label="category.name || category.label"
        :link="isExternalLink(category) ? category.link : getRoute(category)"
      />
    </template>
    <template v-else>
      The menu will show up here once it's configured and enabled in middleware.config.js
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object
    },
    isMenuAvailable: {
      type: Boolean
    },
    getRoute: {
      type: Function
    },
    isExternalLink: {
      type: Function
    }
  }
};
</script>
