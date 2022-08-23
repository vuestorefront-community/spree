<template>
  <div>
    <div ref="paymentRef" />
    <div
      ref="errorRef"
      role="alert"
      class="sf-alert color-danger"
    />
  </div>
</template>

<script>
import { onMounted, ref, computed, useContext } from '@nuxtjs/composition-api';
import { useVSFContext, Logger } from '@vue-storefront/core';
import { loadStripe } from '@stripe/stripe-js';
import { useCart, orderGetters } from '@vue-storefront/spree';

export default {
  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { emit }) {
    const { $config } = useContext();
    const { $spree } = useVSFContext();
    const { cart } = useCart();
    const stripe = ref(null);
    const payment = ref(null);
    const elements = ref(null);
    const paymentRef = ref(null);
    const errorRef = ref(null);
    const publishableKey = computed(() => props.method.preferences?.publishable_key);

    const savePayment = async () => {
      try {
        const orderId = orderGetters.getId(cart.value);
        const { error } = await stripe.value.confirmPayment({
          elements: elements.value,
          confirmParams: {
            return_url: `${$config.baseUrl}/checkout/thank-you?order=${orderId}`
          }
        });

        if (error) {
          errorRef.value.textContent = error.message;
          // Return false to prevent order proceeding to complete
          return false;
        }
      } catch (e) {
        Logger.error(e);
        // Return false to prevent order proceeding to complete
        return false;
      }
    };

    const handleCardChange = (ev) => {
      if (ev.error) {
        errorRef.value.textContent = ev.error.message;
      } else {
        errorRef.value.textContent = '';
      }
      const isPaymentReady = ev.complete && !ev.error;
      emit('change:payment', { isPaymentReady, savePayment });
    };

    onMounted(async () => {
      try {
        // Need to add payment method first to be able to create a payment intent
        const methodId = props.method.id;
        await $spree.api.addPaymentMethod(methodId);

        const paymentIntent = await $spree.api.getPaymentIntent(methodId);

        stripe.value = await loadStripe(publishableKey.value);
        elements.value = stripe.value.elements({
          clientSecret: paymentIntent.clientSecret
        });
        payment.value = elements.value.create('payment');
        payment.value.mount(paymentRef.value);
        payment.value.on('change', handleCardChange);
      } catch (e) {
        Logger.error(e);
      }
    });

    return {
      paymentRef,
      errorRef
    };
  }
};
</script>

<style></style>
