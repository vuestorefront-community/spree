<template>
  <div>
    <ShippingRatePicker
      v-for="(shipment, index) in shipments"
      :key="shipment.id"
      :name="`Shipment #${index}`"
      :shipment="shipment"
      class="vsf-shipping-provider__rate-picker"
      @change="shippingRateId => selectShippingRate(shipment.id, shippingRateId)"
    />

    <SfButton
      v-e2e="'continue-to-billing'"
      :disabled="!allShipmentsSelected"
      type="button"
      @click="save"
    >
      {{ $t('Continue to billing') }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton } from '@storefront-ui/vue';
import { computed, ref, onMounted } from '@nuxtjs/composition-api';
import { Logger, useVSFContext } from '@vue-storefront/core';
import { useCart, useShippingProvider } from '@vue-storefront/spree';
import ShippingRatePicker from '~/components/Checkout/ShippingRatePicker.vue';

export default {
  name: 'VsfShippingProvider',

  components: {
    SfButton,
    ShippingRatePicker
  },

  setup(props, { emit }) {
    const { $spree } = useVSFContext();
    const { setCart } = useCart();
    const { state: shipments, save: saveShipments, load: loadShipments } = useShippingProvider();

    const selectedShippingRates = ref({});

    const allShipmentsSelected = computed(() => {
      if (!selectedShippingRates.value) {
        return false;
      }

      return Object.values(selectedShippingRates.value)?.every(e => e !== null);
    });

    onMounted(async () => {
      await loadShipments();
      selectedShippingRates.value = shipments.value.reduce((prev, curr) => ({...prev, [curr.id]: null }), {});
    });

    const selectShippingRate = (shipmentId, shippingRateId) => {
      selectedShippingRates.value = { ...selectedShippingRates.value, [shipmentId]: shippingRateId };
    };

    const save = async () => {
      try {
        await saveShipments({ shippingMethod: selectedShippingRates.value });
        const updatedCart = await $spree.api.getCart();
        setCart(updatedCart);

        emit('submit');
      } catch (e) {
        Logger.error('VsfShippingProvider', e);
      }
    };

    return {
      shipments,
      allShipmentsSelected,
      selectShippingRate,
      save
    };
  }
};
</script>

<style lang="scss" scoped>
.vsf-shipping-provider__rate-picker {
  margin-bottom: var(--spacer-base);
}
</style>
