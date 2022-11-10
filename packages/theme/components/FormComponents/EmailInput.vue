<template>
  <SfInput
    :name="name"
    :label="label"
    :disabled="disabled"
    :valid="!errors[0]"
    :errorMessage="errors[0]"
    @click="e => $emit('click', e)"
    @input="e => $emit('input', e)"
  />
</template>

<script>
import {
  SfInput
} from '@storefront-ui/vue';

export default {
  name: 'EmailInput',
  components: {
    SfInput
  },
  props: {
    name: {
      type: String,
      default() {
        return 'email';
      }
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    value: {
      type: String,
      required: true
    },
    errors: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
