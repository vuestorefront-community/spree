import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import {
  getCategoryTree as buildCategoryTree,
  getCategoryBreadcrumbs as buildBreadcrumbs
} from './categoryGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData, criteria?: string[]): AgnosticFacet[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] =>
  searchData.data ? searchData.data.facets : [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSortOptions = (searchData): AgnosticSort => {
  if (!searchData.input) return {} as AgnosticSort;

  const { sort } = searchData.input;
  const options = [
    {type: 'sort', id: 'price', value: 'Price ascending'},
    {type: 'sort', id: '-price', value: 'Price descending'},
    {type: 'sort', id: 'updated_at', value: 'Updated at ascending'},
    {type: 'sort', id: '-updated_at', value: 'Updated at descending'}
  ];

  const selectedOption = options.find(option => option.id === sort);

  return { options, selected: selectedOption.id };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategoryTree = (searchData): AgnosticCategoryTree =>
  searchData.data ? buildCategoryTree(searchData.data.categories) : {} as any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = (searchData): any => searchData.data ? searchData.data.products : [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPagination = (searchData): AgnosticPagination => searchData.data ? ({
  currentPage: searchData.input.page,
  totalPages: searchData.data.productsMeta.total_pages,
  totalItems: searchData.data.productsMeta.total_count,
  itemsPerPage: 10,
  pageOptions: []
}) : {} as AgnosticPagination;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBreadcrumbs = (searchData): AgnosticBreadcrumb[] =>
  searchData.data ? buildBreadcrumbs(searchData.data.categories.current) : [];

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
