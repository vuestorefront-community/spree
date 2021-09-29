import { sharedRef, useVSFContext } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { UseCountry } from '../types';

export default function useCountry(id: string): UseCountry {
  const context = useVSFContext();

  const countries = sharedRef([], 'useCountry-countries');
  const states = sharedRef([], `useCountry-states-${id}`);
  const loading = sharedRef(false, `useCountry-loading-${id}`);
  const error = sharedRef({ load: null, loadStates: null }, `useCountry-error-${id}`);

  const load = async () => {
    if (countries.value && countries.value.length > 0) {
      loading.value = false;
      error.value.load = null;
      countries.value = [...countries.value];
      return;
    }

    try {
      loading.value = true;
      const result = await context.$spree.api.getAvailableCountries();
      countries.value = result.sort((a, b) => a.label.localeCompare(b.label));
      error.value.load = null;
    } catch (e) {
      error.value.load = e;
    } finally {
      loading.value = false;
    }
  };

  const loadStates = async (key: string) => {
    try {
      loading.value = true;
      const result = await context.$spree.api.getCountryDetails({ iso: key });
      states.value = result.states;
      error.value.loadStates = null;
    } catch (e) {
      error.value.loadStates = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    countries: computed(() => countries.value),
    states: computed(() => states.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    load,
    loadStates
  };
}
