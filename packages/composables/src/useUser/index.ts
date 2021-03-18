/* istanbul ignore file */

import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User } from '../types';

// @todo useUser

const params: UseUserFactoryParams<User, any, any> = {
  load: async (context: Context) => {
    if (context.$spree.api.isGuest()) {
      return null;
    }

    return await context.$spree.api.getCurrentUser();
  },

  logOut: async (context: Context) => {
    context.$spree.api.logOut();
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
    const bearerToken = await context.$spree.api.logIn({ username, password });
    return bearerToken;
  },

  changePassword: async (context: Context, { newPassword }) => {
    await context.$spree.api.changePassword({ newPassword: newPassword })
    return {};
  }
};

export default useUserFactory<User, any, any>(params);
