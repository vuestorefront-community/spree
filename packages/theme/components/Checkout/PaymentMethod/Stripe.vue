<template>
  <div ref="cardRef" />
</template>

<script>
import { onMounted, ref, computed } from '@vue/composition-api';
import { loadStripe } from '@stripe/stripe-js';

export default {
  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const cardRef = ref(null);
    const publishableKey = computed(() => props.method.preferences?.publishable_key);

    const savePayment = () => {
      console.log('mocked: Saved payment');
    };

    const handleCardChange = (ev) => {
      const isPaymentReady = ev.complete && !ev.error;
      emit('change:payment', { isPaymentReady, savePayment });
    };

    onMounted(async () => {
      try {
        const stripe = await loadStripe(publishableKey.value);
        const elements = stripe.elements();
        const card = elements.create('card');
        card.on('change', handleCardChange);
        card.mount(cardRef.value);
      } catch (e) {
        // TODO
      }
    });

    return {
      cardRef
    };
  }
};
</script>

<style></style>
