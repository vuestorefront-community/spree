# useFacet

## Features

`useFacet` composable can be used to:
- fetch products
- fetch available categories
- filter products by categories, option values, product properties, keyword and price

## API

`search` - function for searching for products. It requires the following params:
  - `input: SearchParams`

  ```ts
  type SearchParams = {
    categorySlug?: string;
    term?: string;
    selectedOptionTypeFilters: SearchParamsOptionTypeFilter[];
    selectedProductPropertyFilters: SearchParamsProductPropertyFilter[];
    priceFilter: string;

    page?: number;
    itemsPerPage?: number;
    sort?: string;
  };

  type SearchParamsOptionTypeFilter = {
    optionTypeName: string;
    optionValueId: number;
  };

  type SearchParamsProductPropertyFilter = {
    productPropertyName: string;
    productPropertyValue: string;
  };
  ```

  - `result` - data object containing the resposne from the backend.

  - `loading: boolean` - boolean indicating if the search is still loading.

  - `error: UseFacetErrors` - error object if the search failed.
