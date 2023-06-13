<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="password-reset-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidatedInput
          v-model="form.newPassword"
          :label="$t('components.my_account.password_reset_form.new_password_label')"
          name="newPassword"
          type="password"
          rules="required|password"
          vid="confirmation"
          required
          fullWidth
          data-cy="password-reset-input_newPassword"
        />
      </div>
      <div class="form__horizontal">
        <ValidatedInput
          v-model="form.newPasswordConfirmation"
          :label="$t('components.my_account.password_reset_form.confirm_password_label')"
          name="newPasswordConfirmation"
          type="password"
          rules="required|password|confirmed:confirmation"
          required
          fullWidth
          data-cy="password-reset-input_newPasswordConfirmation"
        />
      </div>
      <SfButton class="form__button">
        {{ "Change password" }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfInput,
  SfButton,
  SfSelect
} from '@storefront-ui/vue';
import { required, confirmed } from 'vee-validate/dist/rules';
import { ValidationObserver, extend } from 'vee-validate';
import { reactive} from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/spree';
import ValidatedInput from '~/components/ValidatedInputs/ValidatedInput';

export default {
  name: 'PasswordResetForm',
  components: {
    SfInput,
    SfButton,
    SfSelect,
    ValidatedInput,
    ValidationObserver
  },
  password: {
    type: Object,
    default: () => ({
      newPassword: '',
      newPasswordConfirmation: ''
    })
  },
  created() {
    extend('required', {
      ...required,
      message: this.$i18n.t('shared.validation.required')
    });
    extend('password', {
      validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
      message: this.$i18n.t('shared.validation.password.min_characters_letter_number', { minCharacters: 8 })
    });
    extend('confirmed', {
      ...confirmed,
      message: this.$i18n.t('shared.validation.confirmed.passwords')
    });
  },
  setup(password) {
    const { changePassword} = useUser();
    const form = reactive({
      newPassword: password.newPassword,
      newPasswordConfirmation: password.newPasswordConfirmation
    });

    const submitForm = () => {
      changePassword({current: '', new: form.newPassword });
    };

    return {
      form,
      submitForm
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
