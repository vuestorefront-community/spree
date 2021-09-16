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

const buildPriceOptions = (priceRanges: PriceRange[]): AgnosticFacet[] => {
  return priceRanges.map(priceRange => ({
    type: 'attribute',
    id: `${priceRange.min},${priceRange.max}`,
    value: `$${priceRange.min} - $${priceRange.max}`
  }));
};

export const buildPriceFacet = (): AgnosticGroupedFacet => ({
  id: 'price',
  label: 'Price',
  options: buildPriceOptions(priceRanges)
});
