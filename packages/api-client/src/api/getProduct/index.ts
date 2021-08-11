import { ApiContext } from '../../types';
import { addHostToProductImages, deserializeSingleProductVariants } from '../serializers/product';

export default async function getProduct({ client, config }: ApiContext, { slug }) {
  const result = await client.products.show(
    slug,
    {
      include: 'variants.option_values,option_types,product_properties,taxons,images',
      fields: {
        product: 'name,variants,option_types,product_properties,taxons',
        variant: 'name,description,slug,sku,price,display_price,in_stock,product,images,option_values'
      }
    }
  );

  if (result.isSuccess()) {
    try {
      const data = result.success();
      const productsData = addHostToProductImages(data, config);
      const deserializedVariants = deserializeSingleProductVariants(productsData);
      return deserializedVariants;
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log(result.fail());
    throw result.fail();
  }
}

