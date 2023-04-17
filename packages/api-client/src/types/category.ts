export type Category = {
  id: number;
  name: string;
  slug: string;
  localizedSlugs: {
    [key: string]: string;
  };
  items?: Category[];
  parent?: Category;
};

export type CategorySearchResult = {
  root: Category;
  current: Category;
};

export type GetCategoryParams = {
  categorySlug: string;
};

export interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  localizedSlugs: {
    [key: string]: string;
  };
  items: AgnosticCategoryTree[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}
