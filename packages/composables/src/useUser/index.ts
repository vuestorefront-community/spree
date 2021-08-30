/* istanbul ignore file */

import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User } from '../types';
import useCart from '../useCart';

const params: UseUserFactoryParams<User, any, any> = {
  provide() {
    return useCart();
  },

  load: async (context: Context) => {
    if (await context.$spree.api.isGuest()) {
      return null;
    }

    return await context.$spree.api.getCurrentUser();
  },

  logOut: async (context: Context) => {
    await context.$spree.api.logOut();
    context.setCart({_id: 0, lineItems: []});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: updateUser');
    return {};
  },

  register: async (context: Context, { email, password, firstName, lastName }) => {
    await context.$spree.api.registerUser({ email, password, firstName, lastName });

    return {};
  },

  logIn: async (context: Context, { username, password }) => {
    const guestCartToken = context.cart?.value?.token;
    await context.$spree.api.logIn({ username, password, guestCartToken });

    const cart = await context.$spree.api.getCart();
    context.setCart(cart);

    return {};
  },

  changePassword: async (context: Context, { newPassword }) => {
    await context.$spree.api.changePassword({ newPassword: newPassword });
    return {};
  }
};

export default useUserFactory<User, any, any>(params);
