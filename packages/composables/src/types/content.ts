import { Page, CmsSection } from '@vue-storefront/spree-api/src/types';

export type ContentPage = Page;

export type ContentSearchParams = {
  contentPageSlug: string;
};

export type ContentGetters = {
  getPageTitle: (contentPage: ContentPage) => string;
  getPageContent: (contentPage: ContentPage) => string;
  getSectionComponentName: (cmsSection: CmsSection) => string;
  isStandardPage: (contentPage: ContentPage) => boolean;
};
