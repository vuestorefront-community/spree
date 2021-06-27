/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Cart, LineItem, Coupon, ProductVariant } from '../types';

const loadOrCreateCart = async (context: Context, currentCart: Cart): Promise<string> => {
  if (currentCart) {
    return currentCart.token;
  }

  const cart = await context.$spree.api.getCart();
  return cart.token;
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant, Coupon> = {
  load: async (context: Context) => {
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  addItem: async (context: Context, { currentCart, product, quantity }) => {
    const token = await loadOrCreateCart(context, currentCart);
    const cart = await context.$spree.api.addToCart({ variantId: product._variantId, quantity, token });
    return cart;
  },

  removeItem: async (context: Context, { currentCart, product }) => {
    const token = await loadOrCreateCart(context, currentCart);
    const cart = await context.$spree.api.removeFromCart({ lineItemId: product._id, token });
    return cart;
  },

  updateItemQty: async (context: Context, { currentCart, product, quantity }) => {
    const token = await loadOrCreateCart(context, currentCart);
    const cart = await context.$spree.api.updateItemQuantity({ lineItemId: product._id, quantity, token });
    return cart;
  },

  clear: async (context: Context, { currentCart }) => {
    const token = await loadOrCreateCart(context, currentCart);
    await context.$spree.api.clearCart({ token });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  applyCoupon: async (context: Context, { currentCart, couponCode }) => {
    const token = await loadOrCreateCart(context, currentCart);
    await context.$spree.api.applyCoupon({ token, couponCode });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  removeCoupon: async (context: Context, { currentCart, coupon }) => {
    const token = await loadOrCreateCart(context, currentCart);
    await context.$spree.api.removeCoupon({ token, couponCode: coupon });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  isInCart: (_context: Context, { currentCart, product }) => {
    return currentCart.lineItems.find(e => e._variantId === product._variantId) !== undefined;
  }
};

export default useCartFactory<Cart, LineItem, ProductVariant, Coupon>(params);
