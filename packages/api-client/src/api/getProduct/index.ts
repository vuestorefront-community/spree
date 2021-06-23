import { ApiContext } from '../../types';
import { addHostToProductImages, deserializeLimitedVariants, deserializeVariants } from '../serializers/product';

export default async function getProduct({ client, config }: ApiContext, params) {
  const { id, categoryId, page, sort, optionValuesIds, price, itemsPerPage, term } = params;

  const result = await client.products.list({
    filter: {
      ids: id,
      taxons: categoryId,
      // eslint-disable-next-line camelcase
      option_value_ids: optionValuesIds,
      price,
      name: term
    },
    include: 'variants.option_values,option_types,product_properties,taxons,images',
    page,
    sort,
    // eslint-disable-next-line camelcase
    per_page: itemsPerPage
  });

  if (result.isSuccess()) {
    const data = result.success();
    const productsData = addHostToProductImages(data, config);
    return params.limit
      ? {
        data: deserializeLimitedVariants(productsData),
        meta: result.success().meta
      }
      : {
        data: deserializeVariants(productsData),
        meta: result.success().meta
      };
  } else {
    throw result.fail();
  }
}

