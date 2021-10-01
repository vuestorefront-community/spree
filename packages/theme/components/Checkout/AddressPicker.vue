<template>
  <SfAddressPicker
    class="address-picker"
    v-if="addresses && addresses.length > 0"
    v-model="selectedAddressId"
  >
    <SfAddress
      v-for="address in addresses"
      :key="address._id"
      :name="address._id"
    >
      <span>{{ address.firstName }} {{ address.lastName }}</span>
      <span>{{ address.addressLine1 }}</span>
      <span>{{ address.addressLine2 }}</span>
      <span>{{ address.postalCode }}</span>
      <span>{{ address.city }}, {{ address.state }}</span>
      <span>{{ address.country }}</span>
      <span>{{ address.phone }}</span>
    </SfAddress>
    <SfAddress>
      <span>Other address</span>
    </SfAddress>
  </SfAddressPicker>
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api';
import { SfAddressPicker } from '@storefront-ui/vue';
import _ from 'lodash';

export default {
  components: {
    SfAddressPicker
  },
  props: {
    addresses: {
      type: Array,
      default: () => []
    },
    savedAddress: {
      type: Object,
      default: undefined
    }
  },
  setup(props, { emit }) {
    const { addresses, savedAddress } = props;
    const selectedAddressId = ref(undefined);

    const isMatchingAddress = (checkoutAddress, userAddress) => {
      const checkoutAddressWithoutId = _.omit(checkoutAddress, ['_id']);
      const userAddressWithoutId = _.omit(userAddress, ['_id']);
      return _.isEqual(checkoutAddressWithoutId, userAddressWithoutId);
    };

    onMounted(() => {
      if (savedAddress) {
        const address = addresses.find(e => isMatchingAddress(savedAddress, e));
        if (address) selectedAddressId.value = address._id;
      }
    });

    watch(() => selectedAddressId.value, (newVal) => {
      emit('input', newVal);
    });

    return {
      selectedAddressId
    };
  }
};
</script>

<style scoped>
.address-picker {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacer-xs);
  margin-bottom: var(--spacer-xs);
}
</style>
