<template>
  <div />
</template>

<script>
import { onMounted } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';

export default {
  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { emit }) {
    const { $spree } = useVSFContext();

    const savePayment = async () => {
      try {
        const methodId = props.method.id;
        const payload = {};

        await $spree.api.savePaymentMethod(methodId, payload);
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(async () => {
      emit('change:payment', { isPaymentReady: true, savePayment });
    });

    return {};
  }
};
</script>

<style></style>
