import { IQuery } from '@spree/storefront-api-v2-sdk/types/interfaces/Query';

export const cartParams: IQuery = { include: 'line_items.variant.product.images,billing_address,shipping_address' };
