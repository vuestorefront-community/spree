import {
  Context,
  useContentFactory,
  UseContentFactoryParams
} from '@vue-storefront/core';
import { ContentPage, ContentSearchParams } from '../types';

const params: UseContentFactoryParams<ContentPage, ContentSearchParams> = {
  search: async (context: Context, { contentPageSlug, contentPageType }) => {
    if (contentPageType) {
      const contentPages = await context.$spree.api.getCMSPages({
        contentPageType
      });

      return contentPages.data[0];
    }

    const contentPage: ContentPage = await context.$spree.api.getCMSPage({
      contentPageSlug
    });

    return contentPage;
  }
};

export default useContentFactory(params);
