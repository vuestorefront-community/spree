<template>
  <div>
    <SfInput
      @click="e => $emit('click', e)"
      @input="e => $emit('input', e)"
      v-bind="{...$attrs, ...$props}"
      :class="{'disable-input': disabled}"
      :valid="!errors[0]"
      :errorMessage="errors[0]"
    />
  </div>
</template>

<script>
import {
  SfInput
} from '@storefront-ui/vue';

export default {
  name: 'EmailInput',
  props: {
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
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
    value: {
      type: String
    },
    errors: {
      type: Array
    }
  },
  components: {
    SfInput
  }
};
</script>
