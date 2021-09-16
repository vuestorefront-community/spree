import type { AgnosticGroupedFacet } from '@vue-storefront/core';

const deserializeOptionTypeFacet = (optionTypeFilter, selectedOptionValueIds: number[]): AgnosticGroupedFacet => ({
  id: `o.${optionTypeFilter.name}`,
  label: optionTypeFilter.presentation,
  options: optionTypeFilter.option_values.map(optionValue => ({
    type: 'attribute',
    id: optionValue.id,
    value: optionValue.presentation,
    attrName: optionTypeFilter.name,
    selected: selectedOptionValueIds.includes(optionValue.id)
  }))
});

const deserializePropertyFacet = (productPropertyFilter): AgnosticGroupedFacet => ({
  id: `p.${productPropertyFilter.name}`,
  label: productPropertyFilter.presentation,
  options: productPropertyFilter.values.map(productPropertyValue => ({
    type: 'attribute',
    id: productPropertyValue.filter_param,
    value: productPropertyValue.value,
    attrName: productPropertyFilter.name
  }))
});

const deserializeFacets = (filters, selectedOptionValueIds: number[]): AgnosticGroupedFacet[] => {
  if (!filters) return [];

  const { option_types: optionTypes, product_properties: productProperties } = filters;
  const facets = [];

  if (optionTypes) {
    const optionTypeFacets = optionTypes.map(optionType => deserializeOptionTypeFacet(optionType, selectedOptionValueIds));
    facets.push(...optionTypeFacets);
  }

  if (productProperties) {
    const propertyFacets = productProperties.map(property => deserializePropertyFacet(property));
    facets.push(...propertyFacets);
  }

  return facets;
};

export const deserializeSearchMetadata = (searchMetadata, selectedOptionValueIds: number[]) => ({
  totalPages: parseInt(searchMetadata.total_pages, 10),
  totalCount: parseInt(searchMetadata.total_count, 10),
  count: parseInt(searchMetadata.count, 10),
  facets: deserializeFacets(searchMetadata.filters, selectedOptionValueIds)
});
