<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="shipping-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            data-cy="shipping-details-input_firstName"
            v-model="form.firstName"
            name="firstName"
            label="First Name"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            data-cy="shipping-details-input_lastName"
            v-model="form.lastName"
            name="lastName"
            label="Last Name"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        rules="required|min:5"
        v-slot="{ errors }"
        class="form__element"
      >
        <SfInput
          data-cy="shipping-details-input_streetName"
          v-model="form.addressLine1"
          name="streetName"
          label="Street Name"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <SfInput
        data-cy="shipping-details-input_apartment"
        v-model="form.addressLine2"
        name="apartment"
        label="House/Apartment number"
        required
        class="form__element"
      />
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            data-cy="shipping-details-input_city"
            v-model="form.city"
            name="city"
            label="City"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          :rules="`required|oneOf:${states.map(s => s.name).join(',')}`"
          v-if="states && states.length > 0"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfSelect
            data-cy="shipping-details-input_state"
            class="form__select sf-select--underlined"
            v-model="form.state"
            name="state"
            label="State/Province"
            :required="isStateRequired"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="{ code, name } in states"
              :key="code"
              :value="name"
            >
              {{ name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:4"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            data-cy="shipping-details-input_zipCode"
            v-model="form.postalCode"
            name="zipCode"
            label="Zip-code"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-if="countries"
          :rules="`required|oneOf:${countries.map(c => c.key).join(',')}`"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfSelect
            data-cy="shipping-details-select_country"
            class="form__select sf-select--underlined"
            v-model="form.country"
            name="country"
            label="Country"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="{ key, label } in countries"
              :key="key"
              :value="key"
            >
              {{ label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
      </div>
      <ValidationProvider
        rules="required|min:8"
        v-slot="{ errors }"
        class="form__element"
      >
        <SfInput
          data-cy="shipping-details-input_phoneNumber"
          v-model="form.phone"
          name="phone"
          label="Phone number"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <SfCheckbox
        v-model="form.isDefault"
        name="isDefault"
        label="Set as default"
        class="form__checkbox-isDefault"
      />
      <SfButton class="form__button">
        {{ isNew ? "Add the address" : "Update the address" }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { reactive, watch, computed, onMounted } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useCountry } from '@vue-storefront/spree';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

export default {
  name: 'BillingAddressForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },

  props: {
    address: {
      type: Object,
      default: () => ({
        _id: undefined,
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: '',
        isDefault: false
      })
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },

  setup(props, { emit }) {
    const { countries, states, load: loadCountries, loadStates } = useCountry();
    const form = reactive({
      _id: props.address._id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      addressLine1: props.address.addressLine1,
      addressLine2: props.address.addressLine2,
      city: props.address.city,
      state: props.address.state,
      postalCode: props.address.postalCode,
      country: props.address.country,
      phone: props.address.phone,
      isDefault: props.address.isDefault
    });
    const isStateRequired = computed(() => form.country && countries.value.find(e => e.key === form.country).stateRequired);

    const submitForm = () => {
      emit('submit', {
        form,
        onComplete: () => {},
        // TODO: Handle Error
        onError: () => {}
      });
    };

    onSSR(async () => {
      await loadCountries();

      if (form.country) {
        await loadStates(form.country);
      }
    });

    onMounted(async () => {
      await loadCountries();

      if (form.country) {
        await loadStates(form.country);
      }
    });

    watch(() => form.country, async (newValue, oldValue) => {
      if (newValue !== oldValue) {
        form.state = null;
        await loadStates(newValue);
      }
    });

    return {
      form,
      submitForm,
      countries,
      states,
      isStateRequired
    };
  }
};
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }
  &__select {
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
  &__button {
    display: block;
    margin-top: var(--spacer-lg);
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
