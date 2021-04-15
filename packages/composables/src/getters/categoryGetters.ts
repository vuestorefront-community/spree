import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { Category } from '@upsidelab/vue-storefront-spree-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryTree = (categories: any): AgnosticCategoryTree => {
  const { root, current } = categories;

  const itemToTree = (category: Category) => ({
    label: category.name,
    slug: category.slug,
    items: category.items.map(itemToTree),
    isCurrent: category.id === current.id
  });

  return itemToTree(root);
};

const categoryGetters: CategoryGetters<Category> = {
  getTree: getCategoryTree
};

export default categoryGetters;
