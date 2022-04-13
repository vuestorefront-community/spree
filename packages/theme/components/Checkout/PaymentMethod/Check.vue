<template>
  <div />
</template>

<script>
import { onMounted } from '@nuxtjs/composition-api';
import { useVSFContext, Logger } from '@vue-storefront/core';

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
        Logger.error(e);
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
