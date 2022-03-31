/* istanbul ignore file */

import { UserGetters} from '@vue-storefront/core';
import { User } from '../types';

export const getUserFirstName = (user: User): string => user?.firstName || '';

export const getUserLastName = (user: User): string => user?.lastName || '';

export const getUserFullName = (user: User): string => user ? `${user.firstName} ${user.lastName}` : '';

export const getUserEmailAddress = (user: User): string => user?.email || '';

export const getUserCompletedOrders = (user: User): number => user?.completedOrders || 0;

export const getUserStoreCredits = (user: User): number => user?.storeCredits || 0;

const userGetters: UserGetters<User> = {
  getFirstName: getUserFirstName,
  getLastName: getUserLastName,
  getFullName: getUserFullName,
  getEmailAddress: getUserEmailAddress,
  getCompletedOrders: getUserCompletedOrders,
  getStoreCredits: getUserStoreCredits
};

export default userGetters;
