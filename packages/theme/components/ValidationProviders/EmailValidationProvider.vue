<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="mergedRules"
  >
    <slot
      :errors="errors"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import { computed } from '@nuxtjs/composition-api';

export default {
  name: 'EmailValidationProvider',
  props: {
    name: {
      type: String,
      default() {
        return 'email';
      }
    },
    rules: {
      type: String,
      default() {
        return 'email';
      }
    },
    'append-rules': {
      type: String,
      default() {
        return '';
      }
    }
  },
  components: {
    ValidationProvider
  },
  setup({ rules, appendRules }) {
    const mergedRules = computed(() => `${rules}${appendRules ? `|${appendRules}` : ''}`);

    return {
      mergedRules
    };
  }
};
</script>
