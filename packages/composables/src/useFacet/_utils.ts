const priceIds = ['0,50', '51,100', '101,150', '151,200', '201,300'];

const generatePriceOptions = (priceIds) => {
  return priceIds.map(item => ({
    type: 'attribute',
    id: item,
    value: `$${item.split(',')[0]} - $${item.split(',')[1]}`
  }));
};

export const getPriceFacet = () => ({
  id: 'price',
  label: 'Price',
  options: generatePriceOptions(priceIds)
});
