# useProduct

## Features

`useProduct` composable can be used to fetch a list of products.

## API
- `search` - main function for querying products. It requires the following params:
  - `slug: string` - slug of a single product to fetch

  or (for multiple products):

  - `params: GetProductsParams`

  ```ts
  type GetProductsParams = {
    categoryId: string;
    term: string;
    optionTypeFilters: GetProductsOptionTypeFilter[];
    productPropertyFilters: GetProductsPropertyFilter[];
    priceFilter: string;
    page: number;
    itemsPerPage: number;
    sort: string;
  };

  type GetProductsOptionTypeFilter = {
    optionTypeName: string;
    optionValueId: number;
  };

  type GetProductsPropertyFilter = {
    productPropertyName: string;
    productPropertyValue: string;
  };
  ```

- `products: ProductVariant[]` - the main data object that contains an array of products fetched by the `search` method.

  ```ts
  type ProductVariant = {
    _id: number;
    _productId: number;
    _variantId: number;
    _description: string;
    _categoriesRef: string[];
    name: string;
    slug: string;
    sku: string;
    images: Image[];
    properties: Property[];
    breadcrumbs: AgnosticBreadcrumb[];
    optionTypes: OptionType[];
    optionValues: OptionValue[];
    inStock: boolean;
    price: {
      current: number;
      original: number;
    }
    displayPrice: string;
  };
  ```

- `loading: boolean` - indicates whether the `search` method is currently fetching products.

- `error: UseProductError` - the error object that contains the error details if the `search` method fails.
