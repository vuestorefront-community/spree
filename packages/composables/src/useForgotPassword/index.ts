import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  resetPassword: async (context: Context, { email }) => {
    await context.$spree.api.forgotPassword(email);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, { tokenValue, newPassword }) => {
    await context.$spree.api.resetPassword({
      token: tokenValue,
      password: newPassword
    });
  }
};

const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);

export default useForgotPassword;
