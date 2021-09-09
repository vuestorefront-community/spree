const priceIds = ['0,50', '51,100', '101,150', '151,200', '201,300'];

const generatePriceOptions = (priceIds) =>
  priceIds.map(item => ({
    type: 'attribute',
    id: item,
    value: `$${item.split(',')[0]} - $${item.split(',')[1]}`
  }));

const getPriceFacet = (priceIds) => ({
  id: 'price',
  label: 'Price',
  options: generatePriceOptions(priceIds)
});

export const findFacets = (productsMeta) => {
  const filters = productsMeta.filters;
  if (!filters) {
    return [];
  }

  const optionTypeFacets = filters.optionTypes.map(optionType => ({
    id: optionType.id,
    label: optionType.presentation,
    options: optionType.optionValues.map(optionValue => ({
      type: 'attribute',
      id: optionValue.id,
      value: optionValue.presentation,
      attrName: optionValue.name
    }))
  }));

  const propertyFacets = filters.productProperties.map(property => ({
    id: property.id,
    label: property.presentation,
    options: property.values.map(value => ({
      type: 'attribute',
      id: value.value,
      value: value.value,
      attrName: value.filterParam
    }))
  }));

  const priceFacet = getPriceFacet(priceIds);

  return [
    ...optionTypeFacets,
    ...propertyFacets,
    priceFacet
  ];
};
