<template>
  <div>
    <SfAddressPicker
      :selected="String(currentAddressId)"
      @input="setCurrentAddress($event)"
      class="shipping-addresses"
    >
      <SfAddress
        class="shipping-addresses__address"
        v-for="shippingAddress in shippingAddresses"
        :key="UserShippingGetters.getId(shippingAddress)"
        :name="String(UserShippingGetters.getId(shippingAddress))"
      >
        <h1>debug</h1>
        <span
          >{{ UserShippingGetters.getFirstName(shippingAddress) }} {{ UserShippingGetters.getLastName(shippingAddress) }}</span
        >
        <span
          >{{ UserShippingGetters.getStreetName(shippingAddress) }}
          {{ UserShippingGetters.getApartmentNumber(shippingAddress) }}</span
        >
        <span>{{ UserShippingGetters.getPostCode(shippingAddress) }}</span>
        <span
          >{{ UserShippingGetters.getCity(shippingAddress)
          }}{{ UserShippingGetters.getProvince(shippingAddress) ? `, ${UserShippingGetters.getProvince(shippingAddress)}` : '' }}</span
        >
        <span>{{ UserShippingGetters.getCountry(shippingAddress)}}</span>
        <span>{{ UserShippingGetters.getPhone(shippingAddress) }}</span>
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      data-cy="shipping-details-checkbox_isDefault"
      :selected="setAsDefault"
      @change="$emit('changeSetAsDefault', $event)"
      name="setAsDefault"
      label="Use this address as my default one."
      class="shipping-address-setAsDefault"
    />
  </div>
</template>

<script>
import {
  SfCheckbox,
  SfAddressPicker
} from '@storefront-ui/vue';
import { UserShippingGetters } from '@vue-storefront/spree';

export default {
  name: 'UserShipping',
  props: {
    currentAddressId: {
      type: Number,
      required: true
    },
    setAsDefault: {
      type: Boolean,
      required: true
    },
    shippingAddresses: {
      type: Array,
      required: true
    }
  },
  components: {
    SfCheckbox,
    SfAddressPicker
  },
  setup (_, { emit }) {
    const setCurrentAddress = $event => emit('setCurrentAddress', $event);

    return {
      setCurrentAddress,
      UserShippingGetters
    };
  }
};
</script>

<style lang="scss">
.shipping-addresses {
  @include for-desktop {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }
  margin-bottom: var(--spacer-xl);
  &__address {
    margin-bottom: var(--spacer-sm);
  }
}

.shipping-address-setAsDefault, .form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>
