<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="mergedRules"
    :slim="slim"
  >
    <slot :errors="errors" />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import { toRefs } from '@nuxtjs/composition-api';
import useMergedValidationRules from '~/composables/useMergedValidationRules';

export default {
  name: 'EmailValidationProvider',
  components: {
    ValidationProvider
  },
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
        return 'email|trim';
      }
    },
    'append-rules': {
      type: String,
      default() {
        return '';
      }
    },
    slim: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  setup(props) {
    const { rules, appendRules } = toRefs(props);
    const { mergedRules } = useMergedValidationRules(rules, appendRules);

    return {
      mergedRules
    };
  }
};
</script>
