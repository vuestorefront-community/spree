<template>
  <div class="locale-selector">
    <SfButton
      data-cy="locale-select_change-language"
      class="sf-button sf-button--pure locale-selector__opener locale-selector__opener--lang locale-selector__opener--selected"
      @click="toggleLangSelector()"
    >
      <img
        :src="
          `https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${locale}_20x20.jpg`
        "
        width="20"
        height="20"
      />
    </SfButton>
    <SfBottomModal
      :is-open="isLangModalOpen"
      :title="$t('Choose language')"
      @click:close="toggleLangSelector()"
      class="locale-selector__container container container--lang"
    >
      <SfList>
        <SfListItem v-for="lang in availableLocales" :key="lang.code">
          <nuxt-link
            :to="switchLocalePath(lang.code)"
            class="container__action"
          >
            <SfCharacteristic class="container__characteristic">
              <template #title>
                <span class="container__label">{{ lang.label }}</span>
              </template>
              <template #icon>
                <img
                  :src="
                    `https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${lang.code}_20x20.jpg`
                  "
                  class="container__icon"
                  width="20"
                  height="20"
                />
              </template>
            </SfCharacteristic>
          </nuxt-link>
        </SfListItem>
      </SfList>
    </SfBottomModal>
    <SfButton
      data-cy="locale-select_change-currency"
      class="sf-button sf-button--pure locale-selector__opener locale-selector__opener--currency locale-selector__opener--selected"
      @click="toggleCurrencySelector()"
    >
      {{ currency }}
    </SfButton>
    <SfBottomModal
      :is-open="isCurrencyModalOpen"
      :title="$t('Choose currency')"
      @click:close="toggleCurrencySelector()"
      class="locale-selector__container container container--currency"
    >
      <SfList>
        <SfListItem
          v-for="currency in availableCurrencies"
          :key="currency.code"
        >
          <SfButton
            class="sf-button sf-button--pure container__action"
            @click="handleChangeCurrencyClick(currency.code, currency.locale)"
          >
            <SfCharacteristic class="container__characteristic">
              <template #title>
                <span class="container__label">{{ currency.code }}</span>
              </template>
              <template #icon>
                <span />
              </template>
            </SfCharacteristic>
          </SfButton>
        </SfListItem>
      </SfList>
    </SfBottomModal>
  </div>
</template>

<script type="module">
import {
  SfImage,
  SfSelect,
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic,
  SfDropdown
} from '@storefront-ui/vue';
import { ref, computed, onBeforeUnmount } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { VSF_SPREE_CURRENCY_COOKIE } from '@vue-storefront/spree-api';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
export default {
  components: {
    SfImage,
    SfSelect,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic,
    SfDropdown
  },
  setup(props, { root }) {
    const { $spree } = useVSFContext();
    const { locales: allLocales, locale, numberFormats } = root.$i18n;
    const currency = root.$cookies.get(VSF_SPREE_CURRENCY_COOKIE);

    const isLangModalOpen = ref(false);
    const isCurrencyModalOpen = ref(false);
    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const availableLocales = computed(() =>
      allLocales.filter((i) => i.code !== locale)
    );
    const allCurrencies = computed(() =>
      Object.keys(numberFormats).map((locale) => ({
        locale,
        code: numberFormats[locale].currency.currencyDefault
      }))
    );
    const availableCurrencies = computed(() =>
      allCurrencies.value.filter(({ code }) => code !== currency)
    );

    const setCurrencyCookie = (currencyValue) => {
      root.$cookies.set(VSF_SPREE_CURRENCY_COOKIE, currencyValue);
    };

    const handleChangeCurrencyClick = async (newCurrency) => {
      const token = root.$cookies.get('spree-cart-token');
      if (token) {
        const response = await $spree.api.changeCurrency({
          currency,
          newCurrency
        });
        if (response) setCurrencyCookie(newCurrency);
      } else {
        setCurrencyCookie(newCurrency);
      }
      window.location.reload();
    };

    const toggleLangSelector = () => {
      isLangModalOpen.value = !isLangModalOpen.value;
    };

    const toggleCurrencySelector = () => {
      isCurrencyModalOpen.value = !isCurrencyModalOpen.value;
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      allLocales,
      availableLocales,
      allCurrencies,
      availableCurrencies,
      locale,
      currency,
      isLangModalOpen,
      isCurrencyModalOpen,
      handleChangeCurrencyClick,
      isMobile,
      toggleLangSelector,
      toggleCurrencySelector
    };
  }
};
</script>

<style lang="scss" scoped>
.locale-selector {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  &__opener {
    padding: 0.5em 0.75rem;
    font-weight: normal;
  }
  .container {
    &__characteristic {
      display: flex;
      flex-flow: row;
      column-gap: 0.5em;
    }
    &__action {
      margin: 0;
      width: 100%;
      text-align: left;
      display: flex;
      justify-content: flex-start;
      padding: 1em 1rem;
      font-weight: normal;
    }
    .sf-list {
      .container {
        padding: var(--spacer-sm) 0;
      }
      .sf-image {
        --image-width: 20px;
        margin-right: 1rem;
        border: 1px solid var(--c-light);
        border-radius: 50%;
      }
    }
  }
  .sf-bottom-modal {
    z-index: 2;
    left: 0;
  }
}
</style>
