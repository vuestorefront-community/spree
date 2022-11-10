<template>
  <ValidationProvider
    v-slot="{ errors }"
    v-bind="$props"
    :class="{ 'full-width': fullWidth, 'form__horizontal__input': horizontal }"
  >
    <SfSelect
      @input="e => $emit('input', e)"
      :value="value"
      v-bind="{...$attrs, ...$props}"
      :class="{
        'form__element': true,
        'form__select': true,
        'disable-dropdown': disabled
      }"
      :valid="!errors[0]"
      :errorMessage="errors[0]"
    >
      <slot></slot>
    </SfSelect>
  </ValidationProvider>
</template>

<script>
import {
  SfSelect
} from '@storefront-ui/vue';
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'ValidatedInputEmail',
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      default() {
        return '';
      }
    },
    name: {
      type: String,
      default() {
        return 'email';
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    fullWidth: {
      type: Boolean,
      default() {
        return false;
      }
    },
    horizontal: {
      type: Boolean,
      default() {
        return false;
      }
    },
    slim: {
      type: Boolean,
      default() {
        return false;
      }
    },
    rules: {
      type: String,
      default() {
        return 'email';
      }
    },
    'v-e2e': {
      type: String
    },
    'data-cy': {
      type: String
    }
  },
  components: {
    SfSelect,
    ValidationProvider
  }
};
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
  display: block;
}
.form__horizontal__input {
  @include for-desktop {
    flex: 1;
    margin-right: var(--spacer-lg);
  }
}
</style>
