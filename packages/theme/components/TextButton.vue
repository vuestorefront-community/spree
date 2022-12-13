<template>
  <button class="text-button" @click="e => $emit('click', e)">
    <slot />
  </button>
</template>
<script>
export default {
  name: 'TextButton'
};
</script>

<style lang="scss" scoped>
.text-button {
  display: block;
  border: none;
  padding: 0;
  font-size: 1rem;
  cursor: pointer;
}
</style>
