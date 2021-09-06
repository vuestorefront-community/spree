<template>
  <div>
    <SfRadio
      v-e2e="'shipping-method'"
      v-for="method in shippingMethods"
      :key="method.value"
      :label="method.label"
      :value="method.id"
      :description="method.description"
      :selected ="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @input="selectMethod(method.id)"
    >
      <div class="shipping__label">
        {{ method.label }}
      </div>

      <div class="shipping__description">
        {{ method.description }}
      </div>
    </SfRadio>

    <SfButton
      v-e2e="'continue-to-billing'"
      :disabled="!selectedMethod"
      type="button"
      @click="save"
    >
      {{ $t('Continue to billing') }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref, onMounted } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';

export default {
  name: 'VsfShippingProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup(props, { emit }) {
    const { $spree } = useVSFContext();
    const selectedMethod = ref(null);
    const shippingMethods = ref([]);
    const ids = ref([]);

    const selectMethod = method => selectedMethod.value = method;

    onMounted(async () => {
      const { shipmentIds, methods } = await $spree.api.getShippingMethods();

      shippingMethods.value = methods;
      ids.value = shipmentIds;

    });

    const save = () => {
      emit('submit', selectedMethod.value, ids.value);
    };

    return {
      shippingMethods,
      selectedMethod,
      selectMethod,
      save,
      ids
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
