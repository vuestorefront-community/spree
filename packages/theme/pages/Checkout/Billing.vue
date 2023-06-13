<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'billing-heading'"
      :level="3"
      :title="$t('pages.checkout.billing.billing_heading')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <AddressPicker
      v-if="isAuthenticated && savedAddresses"
      v-model="selectedSavedAddressId"
      :addresses="savedAddresses.addresses"
      :saved-address="checkoutBillingAddress"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div v-if="!selectedSavedAddressId" class="form">
        <ValidatedInput
          v-model="form.firstName"
          :label="$t('pages.checkout.billing.first_name_label')"
          name="firstName"
          slim
          required
          rules="required|min:2"
          class="form__element--half"
          v-e2e="'billing-firstName'"
        />
        <ValidatedInput
          v-model="form.lastName"
          :label="$t('pages.checkout.billing.last_name_label')"
          name="lastName"
          slim
          required
          rules="required|min:2"
          class="form__element--half form__element--half-even"
          v-e2e="'shipping-firstName'"
        />
        <ValidatedInput
          v-model="form.addressLine1"
          :label="$t('pages.checkout.billing.street_label')"
          name="streetName"
          slim
          required
          rules="required|min:2"
          v-e2e="'billing-streetName'"
          @click="() => getBackToShippingDetails()"
        />
        <SfInput
          v-e2e="'billing-apartment'"
          v-model="form.addressLine2"
          :label="$t('pages.checkout.billing.apartment_label')"
          name="apartment"
          class="form__element"
        />
        <ValidatedInput
          v-model="form.city"
          :label="$t('pages.checkout.billing.city_label')"
          name="city"
          slim
          required
          rules="required|min:2"
          v-e2e="'billing-city'"
        />
        <ValidatedSelect
          v-model="form.country"
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.billing.country_label')"
          name="country"
          slim
          required
          rules="required|min:2"
          class="form__element--half sf-select--underlined"
          v-e2e="'billing-country'"
        >
          <SfSelectOption
            v-for="countryOption in countries"
            :key="countryOption.key"
            :value="countryOption.key"
          >
            {{ countryOption.label }}
          </SfSelectOption>
        </ValidatedSelect>
        <ValidatedInput
          v-model="form.postalCode"
          :label="$t('pages.checkout.billing.postal_code_label')"
          name="zipCode"
          slim
          required
          rules="required|min:2"
          class="form__element--half form__element--half-even"
          v-e2e="'billing-zipcode'"
        />
        <ValidatedSelect
          v-if="states && states.length > 0"
          v-model="form.state"
          :label="$t('pages.checkout.billing.state_label')"
          name="state"
          slim
          :required="isStateRequired"
          rules="required"
          class="form sf-select--underlined"
        >
          <SfSelectOption
            v-for="{ code, name } in states"
            :key="code"
            :value="code"
          >
            {{ name }}
          </SfSelectOption>
        </ValidatedSelect>
        <ValidatedInput
          v-model="form.phone"
          :label="$t('pages.checkout.billing.phone_number_label')"
          name="phone"
          slim
          required
          rules="required|digits:9"
          class="form__element--half"
          v-e2e="'billing-phone'"
        />
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            @click="router.push(localePath({ name: 'shipping' }))"
          >
            {{ $t('pages.checkout.billing.button_go_back_label') }}
          </SfButton>
          <SfButton
            v-e2e="'continue-to-payment'"
            class="form__action-button"
            type="submit"
          >
            {{ $t('pages.checkout.billing.button_continue_to_payment_label') }}
          </SfButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox
} from '@storefront-ui/vue';
import { ref, watch, computed, onMounted, useRouter } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useBilling, useCountry, useUser, useUserBilling } from '@vue-storefront/spree';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationObserver, extend } from 'vee-validate';
import AddressPicker from '~/components/Checkout/AddressPicker';
import ValidatedInput from '~/components/ValidatedInputs/ValidatedInput';
import _ from 'lodash';

export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    AddressPicker,
    ValidatedInput,
    ValidationObserver
  },
  created() {
    extend('required', {
      ...required,
      message: this.$i18n.t('shared.validation.required')
    });
    extend('min', {
      ...min,
      message: this.$i18n.t('shared.validation.min')
    });
    extend('digits', {
      ...digits,
      message: this.$i18n.t('shared.validation.digits.phone_number')
    });
  },
  setup(_props, { root }) {
    const { billing: checkoutBillingAddress, load, save } = useBilling();
    const { countries, states, load: loadCountries, loadStates } = useCountry();
    const { isAuthenticated } = useUser();
    const { billing: savedAddresses, load: loadSavedAddresses } = useUserBilling();
    const router = useRouter();

    const selectedSavedAddressId = ref(undefined);
    const form = ref({
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: null
    });

    const selectedSavedAddress = computed(() => {
      if (!selectedSavedAddressId.value) {
        return undefined;
      }

      return savedAddresses.value.addresses.find(e => e._id === selectedSavedAddressId.value);
    });
    const isStateRequired = computed(() => form.value.country && countries.value.find(e => e.key === form.value.country).stateRequired);

    const handleFormSubmit = async () => {
      if (isAuthenticated.value && selectedSavedAddress.value) {
        await save({ billingDetails: selectedSavedAddress.value });
      } else {
        await save({ billingDetails: form.value });
      }
      router.push(root.localePath('/checkout/payment'));
    };

    const isEqualAddress = (a, b) => {
      const aWithoutId = _.omit(a, ['_id']);
      const bWithoutId = _.omit(b, ['_id']);
      return _.isEqual(aWithoutId, bWithoutId);
    };

    const populateSelectedAddressId = () => {
      if (checkoutBillingAddress.value && savedAddresses.value?.addresses) {
        selectedSavedAddressId.value = savedAddresses.value.addresses.find(e => isEqualAddress(e, checkoutBillingAddress.value))?._id;
      }
    };

    onMounted(async () => {
      await load();
      await loadSavedAddresses();
      await loadCountries();

      if (checkoutBillingAddress.value) {
        form.value = _.omit(checkoutBillingAddress.value, ['_id']);
      }

      populateSelectedAddressId();
    });

    onSSR(async () => {
      await load();
      await loadSavedAddresses();
      await loadCountries();

      if (checkoutBillingAddress.value) {
        form.value = _.omit(checkoutBillingAddress.value, ['_id']);
      }

      populateSelectedAddressId();
    });

    watch(() => form.value.country, async (newCountryValue, oldCountryValue) => {
      if (newCountryValue === oldCountryValue) return;
      form.value.state = null;
      await loadStates(newCountryValue);
    }, {
      immediate: true
    });

    watch(() => isAuthenticated.value, async (isAuthenticatedNow) => {
      if (!isAuthenticatedNow) return;
      await load();
      await loadSavedAddresses();

      if (checkoutBillingAddress.value) {
        form.value = _.omit({...form.value, ...checkoutBillingAddress.value}, ['_id']);
      }

      populateSelectedAddressId();
    });

    return {
      router,
      isAuthenticated,
      form,
      countries,
      states,
      isStateRequired,
      savedAddresses,
      selectedSavedAddressId,
      checkoutBillingAddress,
      handleFormSubmit
    };
  }
};
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.form {
  ::v-deep &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button, &__back-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        --button-margin: 0;
        text-align: left;
      }
    }
     &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  white;
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__back-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-lg) 0;
    border: 1px solid var(--c-light);
    border-width: 1px 0;
  }
}
.payment-method {
  --radio-container-align-items: center;
  --ratio-content-margin: 0 0 0 var(--spacer-base);
  --radio-label-font-size: var(--font-base);
  --radio-background: transparent;
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  --radio-background: transparent;
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}
</style>
