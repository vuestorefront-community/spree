import type { AgnosticFacet, AgnosticGroupedFacet } from '@vue-storefront/core';
import type { PriceRange } from '../types';

const priceRanges: PriceRange[] = [
  {
    min: 0,
    max: 50
  },
  {
    min: 51,
    max: 100
  },
  {
    min: 101,
    max: 150
  },
  {
    min: 151,
    max: 200
  },
  {
    min: 201,
    max: 300
  }
];

const buildPriceOptions = (priceRanges: PriceRange[], currentPriceRangeString: string): AgnosticFacet[] => {
  return priceRanges.map(priceRange => {
    const priceRangeString = `${priceRange.min},${priceRange.max}`;
    return {
      type: 'attribute',
      id: priceRangeString,
      value: `$${priceRange.min} - $${priceRange.max}`,
      selected: currentPriceRangeString === priceRangeString
    };
  });
};

export const buildPriceFacet = (currentPriceRangeString: string): AgnosticGroupedFacet => ({
  id: 'price',
  label: 'Price',
  options: buildPriceOptions(priceRanges, currentPriceRangeString)
});
