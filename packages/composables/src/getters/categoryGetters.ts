import { CategoryGetters, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category, AgnosticCategoryTree } from './../../../api-client/src/types';

export const getCategoryTree = (categories: any): AgnosticCategoryTree => {
  const { root, current } = categories;

  const itemToTree = (category: Category) => ({
    label: category.name,
    slug: category.slug,
    localizedSlugs: category.localizedSlugs,
    items: category.items.map(itemToTree),
    isCurrent: category.id === current.id
  });

  return itemToTree(root);
};

export const getCategoryBreadcrumbs = (category: Category): AgnosticBreadcrumb[] => {
  const breadcrumbs = [{ text: 'Home', link: '/' }];

  const buildBreadcrumbs = (category) => {
    if (category.parent) buildBreadcrumbs(category.parent);

    breadcrumbs.push({
      text: category.name,
      link: `/c/${category.slug}`
    });
  };
  buildBreadcrumbs(category);

  return breadcrumbs;
};

const categoryGetters: CategoryGetters<Category> = {
  getTree: getCategoryTree,
  getBreadcrumbs: getCategoryBreadcrumbs
};

export default categoryGetters;
