<template>
  <div class="container">
    <SfButton
      data-cy="locale-select_change-language"
      class="container__lang container__lang--selected"
      @click="isLangModalOpen = !isLangModalOpen"
    >
      <img :src="`https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${locale}_20x20.jpg`" width="20" height="20"/>
    </SfButton>
    <SfBottomModal :is-open="isLangModalOpen" title="Choose language" @click:close="isLangModalOpen = !isLangModalOpen">
      <SfList>
        <SfListItem v-for="lang in availableLocales" :key="lang.code">
          <a :href="switchLocalePath(lang.code)">
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ lang.label }}</span>
              </template>
              <template #icon>
                <img :src="`https://cdn.shopify.com/s/files/1/0407/1902/4288/files/${lang.code}_20x20.jpg`" width="20" height="20"/>
              </template>
            </SfCharacteristic>
          </a>
        </SfListItem>
      </SfList>
    </SfBottomModal>
    <SfButton
      data-cy="locale-select_change-currency"
      class="container__currency container__currency--selected"
      @click="isCurrencyModalOpen = !isCurrencyModalOpen"
    >
      {{ currency }}
    </SfButton>
    <SfBottomModal :is-open="isCurrencyModalOpen" title="Choose currency" @click:close="isCurrencyModalOpen = !isCurrencyModalOpen">
      <SfList>
        <SfListItem v-for="currency in availableCurrencies" :key="currency.code">
          <span @click="cartChangeCurrency(currency.code, currency.locale)">
            <SfCharacteristic class="currencyuage">
              <template #title>
                {{ currency.code }}
              </template>
            </SfCharacteristic>
          </span>
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
  SfCharacteristic
} from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';

export default {
  components: {
    SfImage,
    SfSelect,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic
  },
  setup(props, {root}) {
    const { $spree } = useVSFContext();
    const { locales, locale, numberFormats } = root.$i18n;
    const isLangModalOpen = ref(false);
    const isCurrencyModalOpen = ref(false);
    const availableLocales = computed(() => locales.filter(i => i.code !== locale));
    const availableCurrencies = [];
    const currency = root.$cookies.get('vsf-currency')

    const cartChangeCurrency = async (code, locale) => {
      root.$cookies.set('vsf-currency', code)
      root.$cookies.set('vsf-locale', locale)

      const response = await $spree.api.changeCurrency();

      window.location.reload()
    }
    
    Object.entries(numberFormats).forEach(([country]) => {
      const countryCurrency = numberFormats[country].currency.currency;

      if (countryCurrency !== currency){
        availableCurrencies.push({
          locale: country, code: numberFormats[country].currency.currency
        })
      }
    });

    return {
      availableLocales,
      availableCurrencies,
      locale,
      currency,
      isLangModalOpen,
      isCurrencyModalOpen,
      cartChangeCurrency,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  .sf-bottom-modal {
    z-index: 2;
    left: 0;
    @include for-desktop {
      --bottom-modal-height: 100vh;
    }
  }

  .sf-list {
    .language {
      padding: var(--spacer-sm) 0;
    }

    @include for-desktop {
      display: flex;
    }

    .sf-image {
      --image-width: 20px;
      margin-right: 1rem;
      border: 1px solid var(--c-light);
      border-radius: 50%;
    }
  }

  &__lang {
    --image-width: 20px;
    --button-box-shadow: none;
    background: none;
    padding: 0 5px;
    display: flex;
    align-items: center;
    opacity: 0.5;
    border: none;
    &:hover,
    &--selected {
      opacity: 1;
    }
  }

  &__currency {
    background: none;
    --button-box-shadow: none;
    font-weight: normal;
    &:hover,
    &--selected {
      color: var(--c-text);
    }
  }
}
</style>
