<template>
  <div v-if="isAuthenticated && user">
    <SfTable>
      <SfTableRow>
        <SfTableData>Email</SfTableData>
        <SfTableData class="right-column">{{ userGetters.getEmailAddress(user) }}</SfTableData>
      </SfTableRow>
      <SfTableRow>
        <SfTableData>Store Credits</SfTableData>
        <SfTableData class="right-column">{{ userGetters.getStoreCredits(user) }}</SfTableData>
      </SfTableRow>
      <SfTableRow>
        <SfTableData>{{ mainAddress ? `Shipping to ${userShippingGetters.getFirstName(mainAddress)} ${userShippingGetters.getLastName(mainAddress)}` : 'Shipping' }}</SfTableData>
        <SfTableData class="right-column">
          <SfButton class="color-primary redirect-button" :aria-disabled="false" :link="localePath(`/my-account/saved-addresses`)" type="button" >Manage saved addresses</SfButton>
        </SfTableData>
      </SfTableRow>
      <SfTableRow>
        <SfTableData>Orders</SfTableData>
        <SfTableData class="right-column"><SfButton class="color-primary redirect-button" :aria-disabled="false" :link="localePath(`/my-account/order-history`)" type="button" >Show recent orders</SfButton></SfTableData>
      </SfTableRow>
    </SfTable>
  </div>
</template>

<script>
import { userGetters, useUser, useUserShipping, userShippingGetters } from '@vue-storefront/spree';
import { SfProperty, SfHeading, SfTable, SfLink, SfButton, SfInput } from '@storefront-ui/vue';
import { onMounted } from '@nuxtjs/composition-api';
import {computed} from '@nuxtjs/composition-api';
export default {
  name: 'ProfileUpdateForm',
  components: {
    SfProperty,
    SfHeading,
    SfTable,
    SfLink,
    SfButton,
    SfInput
  },
  setup() {
    const {
      isAuthenticated,
      user,
      load: loadUser
    } = useUser();
    const { shipping, load: loadUserShipping } = useUserShipping();
    const addresses = computed(() => userShippingGetters.getAddresses(shipping.value));
    const mainAddress = computed(() => addresses.value ? addresses.value[0] : null);
    onMounted(async () => {
      await loadUserShipping();
      await loadUser();
    });
    return {
      userGetters,
      user,
      mainAddress,
      shipping,
      userShippingGetters,
      isAuthenticated
    };

  }
};
</script>
<style lang="scss" scoped>
.redirect-button {
  width: 75%;
}
.right-column {
  display: flex;
  justify-content: flex-end;
}
</style>
