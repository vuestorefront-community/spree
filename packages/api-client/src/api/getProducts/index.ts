import type { ApiContext, GetProductsParams, ProductSearchResult } from '../../types';
import { addHostToProductImages, deserializeLimitedVariants } from '../serializers/product';
import { deserializeSearchMetadata } from '../serializers/search';

export default async function getProducts({ client, config }: ApiContext, params: GetProductsParams): Promise<ProductSearchResult> {
  try {
    const { categoryId, term, optionTypeFilters, productPropertyFilters, priceFilter, page, itemsPerPage, sort } = params;
    let include;

    if (config.spreeFeatures.fetchPrimaryVariant) {
      include = 'primary_variant,default_variant,variants.option_values,option_types,taxons,images';
    } else {
      include = 'default_variant,variants.option_values,option_types,taxons,images';
    }

    const optionValueIds = optionTypeFilters?.map(filter => filter.optionValueId);
    const properties = productPropertyFilters?.reduce((result, filter) => ({ ...result, [filter.productPropertyName]: filter.productPropertyValue }), {});

    const result = await client.products.list(
      undefined,
      {
        filter: {
          taxons: categoryId,
          option_value_ids: optionValueIds?.join(','),
          // TODO update type definition in Spree Storefront SDK
          properties: properties as any,
          price: priceFilter,
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
      }
    );

    if (result.isSuccess()) {
      const data = result.success();
      const productsData = addHostToProductImages(data, config);

      return {
        data: deserializeLimitedVariants(productsData),
        meta: deserializeSearchMetadata(data.meta, optionTypeFilters, productPropertyFilters)
      };
    } else {
      throw result.fail();
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

