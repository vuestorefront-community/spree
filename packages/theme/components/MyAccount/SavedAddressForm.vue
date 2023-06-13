<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="savedAddress-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidatedInput
          v-model="form.firstName"
          :label="$t('components.my_account.saved_address_form.first_name_label')"
          name="firstName"
          required
          horizontal
          rules="required|min:2"
          data-cy="savedAddress-details-input_firstName"
        />
        <ValidatedInput
          v-model="form.lastName"
          :label="$t('components.my_account.saved_address_form.last_name_label')"
          name="lastName"
          required
          horizontal
          rules="required|min:2"
          data-cy="savedAddress-details-input_lastName"
        />
      </div>
      <ValidatedInput
        v-model="form.addressLine1"
        :label="$t('components.my_account.saved_address_form.street_label')"
        name="streetName"
        required
        rules="required|min:2"
        data-cy="savedAddress-details-input_streetName"
      />
      <SfInput
        data-cy="savedAddress-details-input_apartment"
        v-model="form.addressLine2"
        name="apartment"
        :label="$t('components.my_account.saved_address_form.apartment_label')"
        class="form__element"
      />
      <div class="form__horizontal">
        <ValidatedInput
          v-model="form.city"
          :label="$t('components.my_account.saved_address_form.city_label')"
          name="city"
          required
          horizontal
          rules="required|min:2"
          data-cy="savedAddress-details-input_city"
        />

        <ValidatedSelect
          v-if="states && states.length > 0"
          v-model="form.state"
          :label="$t('components.my_account.saved_address_form.state_label')"
          name="state"
          slim
          horizontal
          :required="isStateRequired"
          :rules="`required|oneOf:${states.map(s => s.name).join(',')}`"
          class="form__select sf-select--underlined"
          data-cy="savedAddress-details-input_state"
        >
          <SfSelectOption
            v-for="{ code, name } in states"
            :key="code"
            :value="name"
          >
            {{ name }}
          </SfSelectOption>
        </ValidatedSelect>
      </div>
      <div class="form__horizontal">
        <ValidatedInput
          v-model="form.postalCode"
          :label="$t('components.my_account.saved_address_form.postal_code_label')"
          name="zipCode"
          required
          horizontal
          rules="required|min:4"
          data-cy="savedAddress-details-input_zipCode"
        />

        <ValidatedSelect
          v-if="countries"
          v-model="form.country"
          :label="$t('components.my_account.saved_address_form.country_label')"
          name="country"
          slim
          horizontal
          required
          :rules="`required|oneOf:${countries.map(c => c.key).join(',')}`"
          class="form__select sf-select--underlined"
          data-cy="savedAddress-details-select_country"
        >
          <SfSelectOption
            v-for="{ key, label } in countries"
            :key="key"
            :value="key"
          >
            {{ label }}
          </SfSelectOption>
        </ValidatedSelect>
      </div>
      <ValidatedInput
        v-model="form.phone"
        :label="$t('components.my_account.saved_address_form.phone_number_label')"
        name="phone"
        required
        rules="required|min:8"
        data-cy="savedAddress-details-input_phoneNumber"
      />
      <SfCheckbox
        v-model="form.isDefault"
        name="isDefault"
        :label="$t('components.my_account.saved_address_form.set_as_default_label')"
        class="form__checkbox-isDefault"
      />
      <SfButton class="form__button">
        {{ $t(`components.my_account.saved_address_form.${isNew ? 'button_add_address_label' : 'button_update_address_label'}`) }}
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
import { ValidationObserver, extend } from 'vee-validate';
import { reactive, watch, computed, onMounted } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useCountry } from '@vue-storefront/spree';
import ValidatedInput from '~/components/ValidatedInputs/ValidatedInput';
import ValidatedSelect from '~/components/ValidatedInputs/ValidatedSelect';

export default {
  name: 'SavedAddressForm',
  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidatedInput,
    ValidatedSelect,
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
  created() {
    extend('required', {
      ...required,
      message: this.$i18n.t('shared.validation.required')
    });
    extend('min', {
      ...min,
      message: this.$i18n.t('shared.validation.min')
    });
    extend('oneOf', {
      ...oneOf,
      message: this.$i18n.t('shared.validation.one_of.country')
    });
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
  ::v-deep &__element {
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
    &__input {
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
