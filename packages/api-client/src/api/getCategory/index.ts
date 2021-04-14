import { CustomQuery } from '@vue-storefront/core';

const findItems = (taxon, taxons) => {
  if (taxon.attributes.is_leaf) return [];

  const taxonIds = taxon.relationships.children.data.map(child => child.id);
  const items = taxons.data.filter(taxon => taxonIds.includes(taxon.id));

  return items.map(item => ({
    id: item.id,
    name: item.attributes.name,
    slug: item.attributes.permalink,
    items: findItems(item, taxons)
  }));
};

const findCategory = (categories, slug) => categories.find(e => e.slug === slug);

const formatCategories = (taxons) =>
  taxons.data.map(taxon => ({
    id: taxon.id,
    name: taxon.attributes.name,
    slug: taxon.attributes.permalink,
    items: findItems(taxon, taxons)
  }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getCategory(context, params, customQuery?: CustomQuery) {
  const result = await context.client.taxons.list();

  if (result.isSuccess()) {
    const taxons = result.success();
    const categories = formatCategories(taxons);
    const { rootCatSlug, categorySlug } = params;
    const slug = rootCatSlug === categorySlug ? rootCatSlug : `${params.rootCatSlug}/${params.categorySlug}`;

    return {
      root: findCategory(categories, 'categories'),
      current: findCategory(categories, slug)
    };
  }
}
