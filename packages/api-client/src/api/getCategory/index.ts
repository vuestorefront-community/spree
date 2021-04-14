import { CustomQuery } from '@vue-storefront/core';

const findItems = (taxon, taxons) => {
  const taxonIds = taxon.relationships.children.data.map(child => child.id);
  const items = taxons.data.filter(taxon => taxonIds.includes(taxon.id));

  return items.map(item => ({
    id: item.id,
    name: item.attributes.name,
    slug: item.attributes.permalink,
    items: []
  }));
};

const findCategory = (categories, slug) => {
  return categories.find(e => e.name.toLowerCase() === slug);
};

const formatCategories = (taxons) =>
  taxons.data.map(taxon => ({
    id: taxon.id,
    name: taxon.attributes.name,
    slug: taxon.attributes.permalink,
    items: taxon.attributes.is_leaf ? [] : findItems(taxon, taxons)
  }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getCategory(context, params, customQuery?: CustomQuery) {
  const result = await context.client.taxons.list();

  if (result.isSuccess()) {
    const taxons = result.success();
    const categories = formatCategories(taxons);

    return {
      tree: findCategory(categories, params.rootCatSlug),
      current: findCategory(categories, params.categorySlug)
    };
  }
}
