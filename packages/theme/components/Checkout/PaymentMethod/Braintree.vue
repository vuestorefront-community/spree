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
import { onMounted, ref } from '@nuxtjs/composition-api';
import { useVSFContext, Logger } from '@vue-storefront/core';
import dropIn from 'braintree-web-drop-in';

export default {
  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { emit }) {
    const { $spree } = useVSFContext();
    const payment = ref(null);
    const paymentRef = ref(null);
    const errorRef = ref(null);
    const fieldCount = ref(null);
    const validFields = ref(0);

    const savePayment = async () => {    
      try {
        const methodId = props.method.id;
        await payment.value.requestPaymentMethod(
          async function(error, braintreeResponse) {
            if (error) {
              Logger.error(error);
              errorRef.value.textContent = error;
              payment.value.clearSelectedPaymentMethod();
              return;
            }
            
            const payload = {
              braintree_last_two: braintreeResponse.details.lastTwo,
              braintree_card_type: braintreeResponse.details.cardType.replace(/\s/g, ""),
              braintree_nonce: braintreeResponse.nonce
            };

            await $spree.api.savePaymentMethod(methodId, payload);
          }
        )
        return true;
      } catch (error) {
        Logger.error(error);
        return false;
      }
    };

    const handleCardChange = (ev) => {
      fieldCount.value ??= Object.keys(ev.fields).length;
      var field = ev.fields[ev.emittedBy];
      if (field.isValid) {
        validFields.value = validFields.value + 1;
      } else {
        validFields.value = validFields.value - 1;
      }
      if (validFields.value === fieldCount.value) {
        const isPaymentReady = true;
        emit('change:payment', { isPaymentReady, savePayment });
      } else {
        const isPaymentReady = false;
        emit('change:payment', { isPaymentReady, savePayment });
      }
    };

    onMounted(async () => {
      try {
        const methodId = props.method.id;

        const response = await $spree.api.getBraintreeToken(methodId);
        
        dropIn.create({
          container: paymentRef.value,
          authorization: response.clientToken
        }, (createError, dropInInstance) => {
          if (createError) {
            Logger.error(createError);
          }
          payment.value = dropInInstance;
          payment.value.on('card:validityChange', handleCardChange);
        });
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
