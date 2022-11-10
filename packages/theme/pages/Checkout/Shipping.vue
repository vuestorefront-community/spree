<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('pages.checkout.shipping.shipping_heading')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <AddressPicker
      v-if="isAuthenticated && savedAddresses"
      v-model="selectedSavedAddressId"
      :key="isFormSubmitted"
      :addresses="savedAddresses.addresses"
      :saved-address="checkoutShippingAddress"
      :isFormSubmitted="isFormSubmitted"
      @input="getBackToShippingDetails()"

    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div v-if="!selectedSavedAddressId" class="form">
        <EmailValidationProvider v-slot="{ errors }" v-if="!isAuthenticated" slim append-rules="required|trim">
          <EmailInput
            :errors="errors"
            v-model="form.email"
            :disabled="isFormSubmitted"
            class="form__element"
            :label="$t('pages.checkout.shipping.email_label')"
            @click="getBackToShippingDetails()"
          />
        </EmailValidationProvider>


        <ValidatedInput
          v-model="form.firstName"
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.shipping.first_name_label')"
          name="firstName"
          slim
          required
          rules="required|min:2"
          class="form__element--half"
          v-e2e="'shipping-firstName'"
          @click="() => getBackToShippingDetails()"
        />
        <ValidatedInput
          v-model="form.lastName"
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.shipping.last_name_label')"
          name="lastName"
          slim
          required
          rules="required|min:2"
          class="form__element--half form__element--half-even"
          v-e2e="'shipping-firstName'"
          @click="() => getBackToShippingDetails()"
        />
        <ValidatedInput
          v-model="form.addressLine1"
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.shipping.street_label')"
          name="streetName"
          slim
          required
          rules="required|min:2"
          v-e2e="'shipping-streetName'"
          @click="() => getBackToShippingDetails()"
        />
        <SfInput
          v-on:click="getBackToShippingDetails()"
          :class="{'disable-input': isFormSubmitted}"
          v-e2e="'shipping-apartment'"
          v-model="form.addressLine2"
          :label="$t('pages.checkout.shipping.apartment_label')"
          name="apartment"
          class="form__element"
        />
        <ValidatedInput
          v-model="form.city"
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.shipping.city_label')"
          name="city"
          slim
          required
          rules="required|min:2"
          v-e2e="'shipping-city'"
          @click="() => getBackToShippingDetails()"
        />
        <ValidatedSelect
          v-model="form.country"
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.shipping.country_label')"
          name="country"
          slim
          required
          rules="required|min:2"
          class="form__element--half sf-select--underlined"
          v-e2e="'shipping-country'"
          @input="getBackToShippingDetails()"
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
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.shipping.postal_code_label')"
          name="zipCode"
          slim
          required
          rules="required|min:2"
          class="form__element--half form__element--half-even"
          v-e2e="'shipping-zipcode'"
          @click="() => getBackToShippingDetails()"
        />
        <ValidatedSelect
          v-if="states && states.length > 0"
          v-model="form.state"
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.shipping.state_label')"
          name="state"
          slim
          :required="isStateRequired"
          rules="required"
          data-cy="shipping-details-input_state"
          class="form sf-select--underlined"
          @input="getBackToShippingDetails()"
        >
          <SfSelectOption
            v-for="{ code, name } in states"
            :key="code"
            :value="name"
          >
            {{ name }}
          </SfSelectOption>
        </ValidatedSelect>
        <ValidatedInput
          v-model="form.phone"
          :disabled="isFormSubmitted"
          :label="$t('pages.checkout.shipping.phone_number_label')"
          name="phone"
          slim
          required
          rules="required|digits:9"
          v-e2e="'shipping-phone'"
          @click="() => getBackToShippingDetails()"
        />
        <SfCheckbox
          class="form__save-address"
          v-if="isAuthenticated && !isFormSubmitted"
          v-model="isSaveAddressSelected"
          :label="$t('pages.checkout.shipping.save_address_label')"
        />
      </div>
      <div class="form">
        <div class="form__action">
          <SfCheckbox
            name="shippingToBilling"
            :label="$t('pages.checkout.shipping.shipping_to_billing_label')"
            hintMessage=""
            :required="false"
            infoMessage=""
            errorMessage=""
            valid
            :disabled="isFormSubmitted"
            v-model="isCopyToBillingSelected"
          />
        </div>
        <div class="form__action">
          <SfButton
            v-if="!isFormSubmitted"
            :disabled="loading"
            class="form__action-button"
            type="submit"
          >
            {{ $t('pages.checkout.shipping.select_shipping_method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isFormSubmitted"
        @submit="routeToBillingOrPayment()"
        @back="() => isFormSubmitted = !isFormSubmitted"
        :buttonText="buttonText"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { ref, watch, computed, onMounted, useRouter } from '@nuxtjs/composition-api';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import { useBilling, useShipping, useCountry, useUser, useUserShipping } from '@vue-storefront/spree';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationObserver, extend } from 'vee-validate';
import AddressPicker from '~/components/Checkout/AddressPicker';
import ValidatedInput from '~/components/ValidatedInputs/ValidatedInput';
import ValidatedSelect from '~/components/ValidatedInputs/ValidatedSelect';
import EmailValidationProvider from '~/components/ValidationProviders/EmailValidationProvider';
import EmailInput from '~/components/FormComponents/EmailInput';
import _ from 'lodash';

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    AddressPicker,
    EmailValidationProvider,
    EmailInput,
    ValidationObserver,
    ValidatedInput,
    ValidatedSelect,
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider')
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
  setup () {
    const router = useRouter();
    const isFormSubmitted = ref(false);
    const isSaveAddressSelected = ref(false);
    const isCopyToBillingSelected = ref(true);
    const buttonText = ref(null);
    const { countries, states, load: loadCountries, loadStates } = useCountry();
    const { shipping: checkoutShippingAddress, load, save, loading } = useShipping();
    const { shipping: savedAddresses, load: loadSavedAddresses, addAddress } = useUserShipping();
    const { isAuthenticated } = useUser();
    const context = useVSFContext();
    const billing = useBilling();

    const selectedSavedAddressId = ref(undefined);
    const form = ref({
      email: '',
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

    const getBackToShippingDetails = () => {
      if (isFormSubmitted.value) {
        isFormSubmitted.value = !isFormSubmitted;
      }
    };

    const isStateRequired = computed(() => form.value.country && countries.value.find(e => e.key === form.value.country).stateRequired);

    const handleFormSubmit = async () => {
      if (!isAuthenticated.value) {
        await context.$spree.api.saveGuestCheckoutEmail(form.value.email);
      }

      const shippingAddress = isAuthenticated.value && selectedSavedAddress.value
        ? selectedSavedAddress.value
        : form.value;

      await save({ shippingDetails: shippingAddress });
      if (isCopyToBillingSelected.value) {
        buttonText.value = context.app.i18n.t('pages.checkout.shipping.button_continue_to_payment_label');
        await billing.save({ billingDetails: shippingAddress });
      } else {
        buttonText.value = context.app.i18n.t('pages.checkout.shipping.button_continue_to_billing_label');
      }

      if (isSaveAddressSelected.value) {
        await addAddress({ address: shippingAddress });
      }

      isFormSubmitted.value = true;
    };

    const isEqualAddress = (a, b) => {
      const aWithoutId = _.omit(a, ['_id']);
      const bWithoutId = _.omit(b, ['_id']);
      return _.isEqual(aWithoutId, bWithoutId);
    };

    const populateSelectedAddressId = () => {
      if (checkoutShippingAddress.value && savedAddresses.value?.addresses) {
        selectedSavedAddressId.value = savedAddresses.value.addresses.find(e => isEqualAddress(e, checkoutShippingAddress.value))?._id;
      }
    };

    const routeToBillingOrPayment = () => {
      if (isCopyToBillingSelected.value) {
        router.push(context.app.localePath('/checkout/payment'));
      } else {
        router.push(context.app.localePath('/checkout/billing'));
      }
    };

    onMounted(async () => {
      await load();
      await loadSavedAddresses();
      await loadCountries();

      if (checkoutShippingAddress.value) {
        form.value = _.omit(checkoutShippingAddress.value, ['_id']);
      }

      populateSelectedAddressId();
    });

    onSSR(async () => {
      await load();
      await loadSavedAddresses();
      await loadCountries();

      if (checkoutShippingAddress.value) {
        form.value = _.omit(checkoutShippingAddress.value, ['_id']);
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

      if (checkoutShippingAddress.value) {
        form.value = _.omit({...form.value, ...checkoutShippingAddress.value}, ['_id']);
      }

      populateSelectedAddressId();
    });

    return {
      router,
      loading,
      isFormSubmitted,
      isSaveAddressSelected,
      isAuthenticated,
      isStateRequired,
      form,
      countries,
      states,
      savedAddresses,
      selectedSavedAddressId,
      checkoutShippingAddress,
      handleFormSubmit,
      isCopyToBillingSelected,
      getBackToShippingDetails,
      routeToBillingOrPayment,
      buttonText
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;
  ::v-deep &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  ::v-deep &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
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
      color:  var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__save-address {
    margin: 0 0 var(--spacer-xs) 0;
    --checkbox-font-family: var(--font-family--secondary);
  }
}

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

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.disable-input{
    --input-border-color: var(--c-text-disabled);
    --input-color: var(--c-text-disabled);
    -webkit-text-fill-color: var(--c-text-disabled);

}
.disable-dropdown{
  color: var(--c-text-disabled);
  --select-dropdown-border-color: var(--c-text-disabled);
  --select-label-color: var(--c-text-disabled);
  --select-dropdown-color: var(--c-text-disabled);
}

</style>
