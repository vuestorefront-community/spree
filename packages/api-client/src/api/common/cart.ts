import type { IQuery } from '@spree/storefront-api-v2-sdk';

export const cartParams: IQuery = { include: 'line_items.variant.product.images,billing_address,shipping_address' };
