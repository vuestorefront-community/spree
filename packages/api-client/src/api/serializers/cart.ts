import { OrderAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Order';
import { CouponCode as CouponCodeAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/endpoints/CartClass';
import { Cart, LineItem } from '../../types';
import { deserializeAddress } from './address';

const findAttachment = (attachments: any[], id: string, type: string) => {
  return attachments.find(e => e.id === id && e.type === type);
};

const formatImageUrl = (styles: any[], backendUrl: string): string => {
  let coverImage = styles[0];

  styles.forEach(img => {
    if (img.height > coverImage.height)
      coverImage = img;
  });

  return backendUrl.concat(coverImage.url);
};

const formatOptions = (optionsText: string) => {
  const optionsArray = optionsText.split(', ');
  return optionsArray.reduce((options, e) => {
    const key = e.split(': ')[0].toLowerCase();
    const value = e.split(': ')[1];
    return {...options, [key]: value};
  }, {});
};

const deserializeLineItem = (lineItem: any, attachments: any[], config: any): LineItem => {
  const variant = findAttachment(attachments, lineItem.relationships.variant.data.id, 'variant');
  const product = findAttachment(attachments, variant.relationships.product.data.id, 'product');
  const image = product.relationships.images.data && product.relationships.images.data.length > 0
    ? findAttachment(attachments, product.relationships.images.data[0].id, 'image')
    : undefined;
  const imageUrl = image
    ? formatImageUrl(image.attributes.styles, config.backendUrl)
    : '';

  return {
    _id: parseInt(lineItem.id, 10),
    _variantId: parseInt(variant.id, 10),
    _description: '',
    _categoriesRef: [],
    name: lineItem.attributes.name,
    sku: '',
    image: imageUrl,
    price: {
      original: lineItem.attributes.price,
      current: lineItem.attributes.price
    },
    displayPrice: lineItem.attributes.display_price,
    displayTotal: lineItem.attributes.display_total,
    qty: lineItem.attributes.quantity,
    options: formatOptions(lineItem.attributes.options_text)
  };
};

const filterIncludedLineItems = (included: any[]) => {
  return included.filter(e => e.type === 'line_item');
};

const findAddress = (data, included) => {
  const shippingAddressId = data.relationships.shipping_address.data?.id || undefined;
  const billingAddressId = data.relationships.billing_address.data?.id || undefined;

  const shippingAddress = findAttachment(included, shippingAddressId, 'address');
  const billingAddress = findAttachment(included, billingAddressId, 'address');

  return {
    shipping: shippingAddress ? deserializeAddress(shippingAddress) : undefined,
    billing: billingAddress ? deserializeAddress(billingAddress) : undefined
  };
};

export const deserializeCart = (apiCart: OrderAttr, included: any[], config: any): Cart => ({
  _id: parseInt(apiCart.id, 10),
  email: apiCart.attributes.email,
  number: apiCart.attributes.number,
  state: apiCart.attributes.state,
  total: apiCart.attributes.display_total,
  totalAmount: parseFloat(apiCart.attributes.total),
  itemTotalAmount: parseFloat(apiCart.attributes.item_total),
  itemTotal: apiCart.attributes.display_item_total,
  shipTotal: apiCart.attributes.display_ship_total,
  shipTotalAmount: parseFloat(apiCart.attributes.ship_total),
  taxTotalAmount: parseFloat(apiCart.attributes.tax_total),
  adjustmentTotal: apiCart.attributes.display_adjustment_total,
  lineItems: filterIncludedLineItems(included).map(item => deserializeLineItem(item, included, config)),
  itemCount: apiCart.attributes.item_count,
  address: findAddress(apiCart, included),
  completedAt: apiCart.attributes.completed_at,
  token: apiCart.attributes.token
});

export const serializeCouponCode = (couponCode: string): CouponCodeAttr => ({
  coupon_code: couponCode
});
