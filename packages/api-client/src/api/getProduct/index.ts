import { ApiContext } from '../../types';
import { addHostToProductImages, deserializeSingleProductVariants } from '../serializers/product';

export default async function getProduct({ client, config }: ApiContext, { slug }) {
  const variantFields = 'name,description,slug,sku,price,display_price,in_stock,product,images,option_values,is_master';

  const result = await client.products.show(
    slug,
    {
      fields: {
        product: 'name,primary_variant,default_variant,variants,option_types,product_properties,taxons',
        variant: variantFields,
        primary_variant: variantFields,
        default_variant: variantFields
      },
      include: 'primary_variant,default_variant,variants.option_values,option_types,product_properties,taxons,taxons.parent,images'
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

