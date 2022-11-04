<template>
  <div id="my-account">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="my-account">
      <div class="my-account__sidebar">
        <h1>{{ $t('pages.my_account.content_page_title_my_account') }}</h1>
        <h2>{{ $t('pages.my_account.content_category_title_personal_details') }}</h2>
        <NuxtLink to="/my-account/my-profile">{{ $t('pages.my_account.content_page_title_my_profile') }}</NuxtLink>
        <NuxtLink to="/my-account/saved-addresses">{{ $t('pages.my_account.content_page_title_saved_addresses') }}</NuxtLink>
        <h2>{{ $t('pages.my_account.content_category_title_order_details') }}</h2>
        <NuxtLink to="/my-account/order-history">{{ $t('pages.my_account.content_page_title_order_history') }}</NuxtLink>
        <span class="my-account__logout" @click="handleLogout">{{ $t('pages.my_account.content_page_title_log_out') }}</span>
      </div>
      <div class="my-account__view">
        <NuxtChild />
      </div>
    </div>
  </div>
</template>
<script>
import { SfBreadcrumbs, SfContentPages } from '@storefront-ui/vue';
import {
  useRouter
} from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/spree';
import MyProfile from './MyAccount/MyProfile';
import SavedAddressesDetails from './MyAccount/SavedAddressesDetails';
import MyNewsletter from './MyAccount/MyNewsletter';
import OrderHistory from './MyAccount/OrderHistory';
import OrderDetails from './MyAccount/OrderDetails';

export default {
  name: 'MyAccount',
  components: {
    SfBreadcrumbs,
    SfContentPages,
    MyProfile,
    SavedAddressesDetails,
    MyNewsletter,
    OrderHistory,
    OrderDetails
  },
  middleware: ['is-authenticated', 'my-profile'],
  setup(props, context) {
    const router = useRouter();
    const { logout } = useUser();

    const handleLogout = async () => {
      await logout();
      router.replace(context.root.localePath({ name: 'home' }));
    };

    return { handleLogout };
  },

  data(root) {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          link: root.localePath('/')
        },
        {
          text: 'My Account',
          link: root.localePath('/my-account')
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#my-account {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
.my-account {
  display: flex;
  --sidebar-width: 300px;

  &__sidebar {
    width: var(--sidebar-width);
    font-family: var(--font-family--secondary);

    h1 {
      font-weight: var(--content-pages-sidebar-title-font-weight);
      font-size: var(--h3-font-size);
      margin: var(--content-pages-sidebar-title-margin, 0 0 var(--spacer-xl) 0);
    }
    h2 {
      font-weight: var(--font-weight--bold);
      font-size: var(--font-size--lg);
      margin: var(--content-pages-sidebar-category-title-margin, var(--spacer-sm) 0);
    }

    a {
      display: block;
      color: var(--c-dark-variant);
      margin: var(--spacer-base) 0;
    }
    .nuxt-link-active {
      color: var(--c-primary)
    }
  }
  &__view {
    width: calc(100% - var(--sidebar-width));
  }
  &__logout {
    cursor: pointer;
  }
}
</style>
