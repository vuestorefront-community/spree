
const findParent = (taxon, apiTaxons) => {
  if (taxon.attributes.is_root) {
    return undefined;
  }

  const parentRelationship = taxon.relationships.parent;
  const parentId = parentRelationship.data.id;
  const parent = apiTaxons.find(taxon => taxon.id === parentId);

  return {
    id: parent.id,
    name: parent.attributes.name,
    slug: parent.attributes.permalink,
    parent: findParent(parent, apiTaxons)
  };
};

const findItems = (taxon, apiTaxons) => {
  if (taxon.attributes.is_leaf) return [];

  const taxonIds = taxon.relationships.children.data.map(child => child.id);
  const items = apiTaxons.filter(taxon => taxonIds.includes(taxon.id));

  return items.map(item => ({
    id: item.id,
    name: item.attributes.name,
    slug: item.attributes.permalink,
    items: findItems(item, apiTaxons),
    parent: findParent(item, apiTaxons)
  }));
};

export const deserializeCategories = (apiTaxons) =>
  apiTaxons.map(taxon => ({
    id: taxon.id,
    name: taxon.attributes.name,
    slug: taxon.attributes.permalink,
    items: findItems(taxon, apiTaxons),
    parent: findParent(taxon, apiTaxons)
  }));
