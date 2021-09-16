import { ApiContext } from '../../types';
import { addHostToProductImages, deserializeLimitedVariants } from '../serializers/product';
import { deserializeSearchMetadata } from '../serializers/search';

export default async function getProducts({ client, config }: ApiContext, params) {
  const { id, categoryId, page, sort, optionValuesIds, price, itemsPerPage, term } = params;
  let include;

  if (config.spreeFeatures.fetchPrimaryVariant) {
    include = 'primary_variant,default_variant,variants.option_values,option_types,taxons,images';
  } else {
    include = 'default_variant,variants.option_values,option_types,taxons,images';
  }

  const result = await client.products.list({
    filter: {
      ids: id,
      taxons: categoryId,
      option_value_ids: optionValuesIds,
      price,
      name: term
    },
    fields: {
      product: 'name,slug,sku,description,primary_variant,default_variant,variants,option_types,taxons',
      variant: 'sku,price,display_price,in_stock,product,images,option_values,is_master'
    },
    include,
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

