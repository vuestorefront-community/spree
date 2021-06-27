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

const filterOptions = (options) =>
  options.reduce((options, item) =>
    options.find(o => o.id === item.id) ? options : options.concat(item)
  , []);

const findOptions = (products, name) => {
  const options = products
    .map(product => product[name])
    .reduce((options, item) => {
      return options.concat(item);
    }, []);

  return filterOptions(options);
};

export const findFacets = (products) => {
  const optionTypes = findOptions(products, 'optionTypes');
  const optionValues = findOptions(products, 'optionValues');

  const facets = [];

  optionTypes.forEach(type => {
    const values = optionValues.filter(value =>
      value.optionTypeId === type.id
    );

    facets.push({
      id: type.name,
      label: type.presentation,
      options: values.map(value => ({
        type: 'attribute',
        id: value.id,
        value: value.presentation,
        attrName: type.name
      }))
    });
  });

  facets.push(getPriceFacet(priceIds));

  return facets;
};
