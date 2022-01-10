import { ForgotPasswordGetters } from '@vue-storefront/core';
import { PasswordResetResult } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getResetPasswordToken(result: PasswordResetResult): string {
  // reset password token is provided by query param
  return '';
}

function isPasswordChanged(result: PasswordResetResult): boolean {
  return result.isPasswordChanged;
}

const forgotPasswordGetters: ForgotPasswordGetters<PasswordResetResult> = {
  getResetPasswordToken,
  isPasswordChanged
};

export default forgotPasswordGetters;
