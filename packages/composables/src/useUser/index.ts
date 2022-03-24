/* istanbul ignore file */

import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User } from '../types';
import useCart from '../useCart';
import useWishlist from '../useWishlist';
import { handleApiErrorResponse, extractApiErrorSummary } from '../utils/error';

const params: UseUserFactoryParams<User, any, any> = {
  provide: () => ({
    useCart: useCart(),
    useWishlist: useWishlist()
  }),

  load: async (context: Context) => {
    if (await context.$spree.api.isGuest()) {
      return null;
    }

    return await context.$spree.api.getCurrentUser();
  },

  logOut: async (context: Context) => {
    await context.$spree.api.logOut();
    context.useCart.setCart({ _id: 0, lineItems: [] });
    context.useWishlist.setWishlist({ token: undefined, wishedProducts: [] });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    await context.$spree.api.updateCurrentUser(updatedUserData);
    return {};
  },

  register: async (context: Context, { email, password, firstName, lastName }) => {
    try {
      const guestCartToken = context.useCart.cart?.value?.token;
      await context.$spree.api.registerUser({ email, password, firstName, lastName });
      await context.$spree.api.logIn({ username: email, password, guestCartToken });

      const wishlist = await context.$spree.api.getWishlist();
      context.useWishlist.setWishlist(wishlist);

      return {};
    } catch (e) {
      handleApiErrorResponse(e);
    }
  },

  logIn: async (context: Context, { username, password }) => {
    try {
      const guestCartToken = context.useCart.cart?.value?.token;
      await context.$spree.api.logIn({ username, password, guestCartToken });

      const cart = await context.$spree.api.getCart();
      context.useCart.setCart(cart);

      const wishlist = await context.$spree.api.getWishlist();
      context.useWishlist.setWishlist(wishlist);

      return {};
    } catch (e) {
      if (extractApiErrorSummary(e) === 'invalid_grant') {
        throw new Error('Invalid username or password');
      }

      throw e;
    }
  },

  changePassword: async (context: Context, { newPassword }) => {
    await context.$spree.api.changePassword({ newPassword: newPassword });
    return {};
  }
};

export default useUserFactory<User, any, any>(params);
