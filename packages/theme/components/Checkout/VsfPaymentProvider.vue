<template>
  <div>
    <div v-for="method in paymentMethods" :key="method.type">
      <SfRadio
        v-e2e="'payment-method'"
        :key="method.type"
        :label="method.label"
        :value="method.type"
        :description="method.description"
        :selected="selectedMethod"
        name="shippingMethod"
        class="form__radio shipping"
        @input="selectMethod(method.type)"
      >
        <div class="shipping__label">
          {{ method.label }}
        </div>
      </SfRadio>
      <component
        v-if="method.type === selectedMethod"
        :is="paymentComponent"
        :method="method"
        @change:payment="handlePaymentChange"
      />
    </div>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref, onMounted, computed } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import Stripe from '~/components/Checkout/PaymentMethod/Stripe';

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfButton,
    SfRadio,
    Stripe
  },

  setup(props, { emit }) {
    const { $spree } = useVSFContext();
    const paymentMethods = ref([]);
    const selectedMethod = ref(null);

    const selectMethod = (method) => {
      selectedMethod.value = method;
      emit('status');
    };

    const paymentComponent = computed(() => {
      switch (selectedMethod.value) {
        case 'Spree::Gateway::StripeElementsGateway':
          return 'Stripe';
      }
    });

    const handlePaymentChange = (params) => {
      emit('change:payment', params);
    };

    onMounted(async () => {
      paymentMethods.value = await $spree.api.getPaymentMethods();
    });

    return {
      paymentMethods,
      selectedMethod,
      selectMethod,
      paymentComponent,
      handlePaymentChange
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
