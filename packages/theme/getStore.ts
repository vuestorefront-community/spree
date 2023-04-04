import axios from 'axios';
import urlJoin from 'url-join';

interface StoreConfig {
  backendUrl: string
}

/* eslint-disable camelcase */
export interface StoreAttr {
  type: string
  id: string
  attributes: {
    name: string
    url: string
    meta_description: string | null
    meta_keywords: string | null
    seo_title: string | null
    default_currency: string
    supported_currencies: string
    default_locale: string
    supported_locales: string
  }
}
interface IStore {
  data: StoreAttr
}
interface Store {
  name: string
  url: string
  metaDescription?: string
  metaKeywords?: string
  seoTitle?: string
  defaultCurrency: string
  supportedCurrencies: string
  defaultLocale: string
  supportedLocales: string
}

const apiRoute = '/api/v2/storefront/store';

const deserializeStore = (apiStore: StoreAttr): Store => ({
  name: apiStore.attributes.name,
  url: apiStore.attributes.url,
  metaDescription: apiStore.attributes.meta_description,
  metaKeywords: apiStore.attributes.meta_keywords,
  seoTitle: apiStore.attributes.seo_title,
  defaultCurrency: apiStore.attributes.default_currency,
  supportedCurrencies: apiStore.attributes.supported_currencies,
  defaultLocale: apiStore.attributes.default_locale,
  supportedLocales: apiStore.attributes.supported_locales
});

const getStore = async (config: StoreConfig): Promise<Store> => {
  const res = await axios.get(urlJoin(config.backendUrl, apiRoute)).then((res) => res.data) as IStore;
  return deserializeStore(res.data);
};

export default getStore;
