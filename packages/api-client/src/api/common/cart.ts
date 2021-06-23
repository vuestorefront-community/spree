import { IQuery } from '@spree/storefront-api-v2-sdk/types/interfaces/Query';

export const defaultCartIncludes: IQuery = { include: 'line_items.variant.product.images' };
