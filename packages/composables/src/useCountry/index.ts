import {
  sharedRef,
  Logger,
  configureFactoryParams
} from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

const useCountryFactory = (factoryParams) => {
  return function useCountry() {
    const loading = sharedRef(false, 'useCountry-loading');
    const countries = sharedRef(null, 'useCountry-countries');
    const error = sharedRef({ load: null }, 'useCountry-error');

    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async ({ customQuery } = { customQuery: undefined }) => {
      Logger.debug('useCountry.load');

      if (countries.value) {
        loading.value = false;
        error.value.load = null;
        countries.value = { ...countries.value };
        return;
      }
      try {
        loading.value = true;
        countries.value = await _factoryParams.load({ customQuery });
        error.value.load = null;
      } catch (err) {
        error.value.load = err;
        Logger.error('useCountry/load', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      countries: computed(() => countries.value),
      load,
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
};

const params = {
  load: async (context) => {
    const countries = await context.$spree.api.getAvailableCountries();
    return countries;
  }
};

export default useCountryFactory(params);
