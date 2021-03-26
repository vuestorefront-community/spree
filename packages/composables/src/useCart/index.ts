/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Cart, CartItem, Coupon, Product } from '../types';

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  load: async (context: Context) => {
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  addItem: async (context: Context, { product, quantity }) => {
    await context.$spree.api.addToCart({ variantId: product._variantId, quantity });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  removeItem: async (context: Context, { product }) => {
    await context.$spree.api.removeFromCart({ lineItemId: product._id });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  updateItemQty: async (context: Context, { product, quantity }) => {
    await context.$spree.api.updateItemQuantity({ lineItemId: product._id, quantity });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  clear: async (context: Context) => {
    await context.$spree.api.clearCart();
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  applyCoupon: async (context: Context, { couponCode }) => {
    await context.$spree.api.applyCoupon({ couponCode });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  removeCoupon: async (context: Context, { coupon }) => {
    await context.$spree.api.removeCoupon({ couponCode: coupon });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  isInCart: (_context: Context, { currentCart, product }) => {
    return currentCart.lineItems.find(e => e._variantId === product._variantId) !== undefined;
  }
};

export default useCartFactory<Cart, CartItem, Product, Coupon>(params);
