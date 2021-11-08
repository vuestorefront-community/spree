/* istanbul ignore file */

import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import { Cart, LineItem, ProductVariant } from '../types';

const loadOrCreateCartToken = async (context: Context, currentCart: Cart): Promise<string> => {
  if (currentCart && currentCart.token) {
    return currentCart.token;
  }

  const cart = await context.$spree.api.getOrCreateCart();
  return cart.token;
};

const params: UseCartFactoryParams<Cart, LineItem, ProductVariant> = {
  load: async (context: Context) => {
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  addItem: async (context: Context, { currentCart, product, quantity }) => {
    const token = await loadOrCreateCartToken(context, currentCart);
    const cart = await context.$spree.api.addToCart({ variantId: product._variantId, quantity, token });
    return cart;
  },

  removeItem: async (context: Context, { currentCart, product }) => {
    const token = await loadOrCreateCartToken(context, currentCart);
    const cart = await context.$spree.api.removeFromCart({ lineItemId: product._id, token });
    return cart;
  },

  updateItemQty: async (context: Context, { currentCart, product, quantity }) => {
    const token = await loadOrCreateCartToken(context, currentCart);
    const cart = await context.$spree.api.updateItemQuantity({ lineItemId: product._id, quantity, token });
    return cart;
  },

  clear: async (context: Context, { currentCart }) => {
    const token = await loadOrCreateCartToken(context, currentCart);
    await context.$spree.api.clearCart({ token });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  applyCoupon: async (context: Context, { currentCart, couponCode }) => {
    const token = await loadOrCreateCartToken(context, currentCart);
    try {
      await context.$spree.api.applyCoupon({ token, couponCode });
    } catch (e) {
      throw e.response?.data?.summary ? new Error(e.response.data.summary) : e;
    }
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  removeCoupon: async (context: Context, { currentCart, couponCode }) => {
    const token = await loadOrCreateCartToken(context, currentCart);
    await context.$spree.api.removeCoupon({ token, couponCode });
    const cart = await context.$spree.api.getCart();
    return cart;
  },

  isInCart: (_context: Context, { currentCart, product }) => {
    if (!currentCart || !currentCart.lineItems) {
      return false;
    }

    return currentCart.lineItems.find(e => e._variantId === product._variantId) !== undefined;
  }
};

export default useCartFactory<Cart, LineItem, ProductVariant>(params);
