import { JsonApiDocument } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi';
import {User} from '../../types';

export const deserializeUser = (jsonUser: JsonApiDocument): User => {
  return {
    id: parseInt(jsonUser.id),
    firstName: jsonUser.attributes.first_name,
    lastName: jsonUser.attributes.last_name,
    email: jsonUser.attributes.email,
    completedOrders: jsonUser.attributes.completed_orders,
    storeCredits: jsonUser.attributes.store_credits
  };
};
