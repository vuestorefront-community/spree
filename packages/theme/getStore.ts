import axios from 'axios';
import urlJoin from 'url-join';

interface StoreConfig {
  backendUrl: string
}

/* eslint-disable camelcase */
export interface StoreResponse {
  data: {
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
}
interface Store {
  name: string
  url: string
  defaultCurrency: string
  supportedCurrencies: string
  defaultLocale: string
  supportedLocales: string
  metaDescription?: string
  metaKeywords?: string
  seoTitle?: string
}

const apiRoute = '/api/v2/storefront/store';

const deserializeStore = ({ data: { attributes } }: StoreResponse): Store => ({
  name: attributes.name,
  url: attributes.url,
  metaDescription: attributes.meta_description,
  metaKeywords: attributes.meta_keywords,
  seoTitle: attributes.seo_title,
  defaultCurrency: attributes.default_currency,
  supportedCurrencies: attributes.supported_currencies,
  defaultLocale: attributes.default_locale,
  supportedLocales: attributes.supported_locales
});

const getStore = async (config: StoreConfig): Promise<Store> => {
  const { data } = (await axios.get(urlJoin(config.backendUrl, apiRoute))) as { data: StoreResponse };
  return deserializeStore(data);
};

export default getStore;
