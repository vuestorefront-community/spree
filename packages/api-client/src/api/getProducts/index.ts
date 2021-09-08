import { ApiContext } from '../../types';
import { addHostToProductImages, deserializeLimitedVariants, deserializeSearchMetadata } from '../serializers/product';

export default async function getProducts({ client, config }: ApiContext, params) {
  const { id, categoryId, page, sort, optionValuesIds, price, itemsPerPage, term } = params;
  const variantFields = 'name,slug,sku,price,display_price,product,images,option_values,is_master';

  const result = await client.products.list({
    filter: {
      ids: id,
      taxons: categoryId,
      option_value_ids: optionValuesIds,
      price,
      name: term
    },
    fields: {
      product: 'name,slug,primary_variant,default_variant,variants,option_types,taxons',
      variant: variantFields,
      primary_variant: variantFields,
      default_variant: variantFields
    },
    include: 'primary_variant,default_variant,variants.option_values,option_types,taxons,images',
    page,
    sort,
    per_page: itemsPerPage
  });

  if (result.isSuccess()) {
    try {
      const data = result.success();
      const productsData = addHostToProductImages(data, config);
      return {
        data: deserializeLimitedVariants(productsData),
        meta: deserializeSearchMetadata(data.meta)
      };
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log(result.fail());
    throw result.fail();
  }
}
