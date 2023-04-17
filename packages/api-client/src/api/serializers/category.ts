const serializeCategoryBase = (category) => ({
  id: category.id,
  name: category.attributes.name,
  slug: category.attributes.permalink,
  localizedSlugs: category.attributes.localized_slugs || {}
});

const findParent = (taxon, apiTaxons) => {
  if (taxon.attributes.is_root) {
    return undefined;
  }

  const parentRelationship = taxon.relationships.parent;
  const parentId = parentRelationship.data.id;
  const parent = apiTaxons.find(taxon => taxon.id === parentId);

  return {
    ...serializeCategoryBase(parent),
    parent: findParent(parent, apiTaxons)
  };
};

const findItems = (taxon, apiTaxons) => {
  if (taxon.attributes.is_leaf) return [];

  const taxonIds = taxon.relationships.children.data.map(child => child.id);
  const items = apiTaxons.filter(taxon => taxonIds.includes(taxon.id));

  return items.map(item => ({
    ...serializeCategoryBase(item),
    items: findItems(item, apiTaxons),
    parent: findParent(item, apiTaxons)
  }));
};

export const deserializeCategories = (apiTaxons) =>
  apiTaxons.map(taxon => ({
    ...serializeCategoryBase(taxon),
    items: findItems(taxon, apiTaxons),
    parent: findParent(taxon, apiTaxons)
  }));
