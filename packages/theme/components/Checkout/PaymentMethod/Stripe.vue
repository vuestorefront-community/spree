<template>
  <div ref="cardRef" />
</template>

<script>
import { onMounted, ref, computed } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { loadStripe } from '@stripe/stripe-js';

export default {
  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { emit }) {
    const { $spree } = useVSFContext();
    const stripe = ref(null);
    const card = ref(null);
    const cardRef = ref(null);
    const areIntentsEnabled = computed(() => props.method.preferences?.intents);
    const publishableKey = computed(() => props.method.preferences?.publishable_key);

    const savePayment = async () => {
      try {
        const methodId = props.method.id;
        const { token } = await stripe.value.createToken(card.value);

        const payload = {
          // eslint-disable-next-line camelcase
          gateway_payment_profile_id: token.id,
          number: token.card.last4,
          month: token.card.exp_month,
          year: token.card.exp_year,
          name: token.card.name
        };

        await $spree.api.savePaymentMethod(methodId, payload);

        if (areIntentsEnabled.value) {
          const threeDSecureData = await $spree.api.getPaymentConfirmationData();
          const confirmCardPaymentResponse = await stripe.value.confirmCardPayment(threeDSecureData.clientSecret, {});
          const handlePaymentConfirmationResponse = await $spree.api.handlePaymentConfirmationResponse({
            confirmationResponse: confirmCardPaymentResponse
          });

          if (!handlePaymentConfirmationResponse.success) {
            throw new Error('Failed to confirm payment');
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    const handleCardChange = (ev) => {
      const isPaymentReady = ev.complete && !ev.error;
      emit('change:payment', { isPaymentReady, savePayment });
    };

    onMounted(async () => {
      try {
        stripe.value = await loadStripe(publishableKey.value);
        const elements = stripe.value.elements();
        card.value = elements.create('card');
        card.value.on('change', handleCardChange);
        card.value.mount(cardRef.value);
      } catch (e) {
        console.error(e);
      }
    });

    return {
      cardRef
    };
  }
};
</script>

<style></style>
