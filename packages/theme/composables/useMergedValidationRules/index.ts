import { computed } from '@nuxtjs/composition-api';

function useMergedValidationRules(...rules) {
  const mergedRules = computed(() => rules.map(x => x.value).filter(Boolean).join('|'));

  return {
    mergedRules
  };
}

export default useMergedValidationRules;
