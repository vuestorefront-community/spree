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
      value.relationships.option_type.data.id === type.id
    );

    facets.push({
      id: type.attributes.name,
      label: type.attributes.presentation,
      options: values.map(value => ({
        type: 'attribute',
        id: value.attributes.name,
        value: value.attributes.presentation,
        attrName: type.attributes.name
      }))
    });
  });

  return facets;
};
