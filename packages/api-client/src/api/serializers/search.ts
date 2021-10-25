import type { AgnosticGroupedFacet } from '@vue-storefront/core';
import type { GetProductsOptionTypeFilter, GetProductsPropertyFilter, ProductSearchMetadata } from '../../types';

const deserializeOptionTypeFacet = (optionTypeFilter, selectedOptionTypeFilters: GetProductsOptionTypeFilter[]): AgnosticGroupedFacet => {
  const selectedOptionValueIds = selectedOptionTypeFilters?.map(selectedOptionTypeFilter => selectedOptionTypeFilter.optionValueId) || [];

  return {
    id: `o.${optionTypeFilter.name}`,
    label: optionTypeFilter.presentation,
    options: optionTypeFilter.option_values.map(optionValue => ({
      type: 'attribute',
      id: optionValue.id,
      value: optionValue.presentation,
      attrName: optionTypeFilter.name,
      selected: selectedOptionValueIds.includes(optionValue.id)
    }))
  };
};

const deserializePropertyFacet = (productPropertyFilter, selectedProductPropertyFilters: GetProductsPropertyFilter[]): AgnosticGroupedFacet => ({
  id: `p.${productPropertyFilter.name}`,
  label: productPropertyFilter.presentation,
  options: productPropertyFilter.values.map(productPropertyValue => ({
    type: 'attribute',
    id: productPropertyValue.filter_param,
    value: productPropertyValue.value,
    attrName: productPropertyFilter.name,
    selected: selectedProductPropertyFilters?.some(e => e.productPropertyName === productPropertyFilter.name && e.productPropertyValue === productPropertyValue.filter_param)
  }))
});

const deserializeFacets = (filters, selectedOptionTypeFilters: GetProductsOptionTypeFilter[], selectedProductPropertyFilters: GetProductsPropertyFilter[]): AgnosticGroupedFacet[] => {
  if (!filters) return [];

  const { option_types: optionTypes, product_properties: productProperties } = filters;
  const facets = [];

  if (optionTypes) {
    const optionTypeFacets = optionTypes.map(optionType => deserializeOptionTypeFacet(optionType, selectedOptionTypeFilters));
    facets.push(...optionTypeFacets);
  }

  if (productProperties) {
    const propertyFacets = productProperties.map(property => deserializePropertyFacet(property, selectedProductPropertyFilters));
    facets.push(...propertyFacets);
  }

  return facets;
};

export const deserializeSearchMetadata = (searchMetadata, selectedOptionTypeFilters: GetProductsOptionTypeFilter[], selectedProductPropertyFilters: GetProductsPropertyFilter[]): ProductSearchMetadata => ({
  totalPages: parseInt(searchMetadata.total_pages, 10),
  totalCount: parseInt(searchMetadata.total_count, 10),
  count: parseInt(searchMetadata.count, 10),
  facets: deserializeFacets(searchMetadata.filters, selectedOptionTypeFilters, selectedProductPropertyFilters)
});
