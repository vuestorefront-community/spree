<template>
  <div class="shipping-rate-picker">
    <SfHeading
      :level="4"
      :title="name"
      class="shipping-rate-picker__name sf-heading--left sf-heading--no-underline title"
    />
    <SfRadio
      v-e2e="'shipping-method'"
      v-for="rate in shippingRates"
      :key="rate.id"
      :label="rate.name"
      :value="rate.id"
      :description="$n(rate.cost, 'currency')"
      :selected ="selectedRateId"
      name="shippingMethod"
      class="form__radio"
      @input="selectRate(rate.id)"
    />
  </div>
</template>

<script>
import { SfHeading, SfRadio } from '@storefront-ui/vue';

export default {
  name: 'ShippingRatePicker',

  components: {
    SfHeading,
    SfRadio
  },

  props: {
    name: {
      type: String,
      required: true
    },
    shipment: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedRateId: null
    };
  },

  computed: {
    shippingRates() {
      return this.shipment.availableShippingRates;
    }
  },

  methods: {
    selectRate(value) {
      this.selectedRateId = value;
      this.$emit('change', value);
    }
  }
};
</script>

<style lang="scss" scoped>
.shipping-rate-picker__name {
  margin-bottom: var(--spacer-sm);
}
</style>
