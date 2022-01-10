import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';
import { PasswordResetResult } from '../types';

const factoryParams: UseForgotPasswordFactoryParams<PasswordResetResult> = {
  resetPassword: async (context: Context, { email }) => {
    await context.$spree.api.forgotPassword(email);

    return {};
  },

  setNewPassword: async (context: Context, { tokenValue, newPassword }) => {
    await context.$spree.api.resetPassword({
      token: tokenValue,
      password: newPassword
    });

    return {
      isPasswordChanged: true
    };
  }
};

const useForgotPassword = useForgotPasswordFactory<PasswordResetResult>(factoryParams);

export default useForgotPassword;
