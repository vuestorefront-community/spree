import { CustomQuery } from "@vue-storefront/core";

export default async function logOut(context, _params, _customQuery?: CustomQuery) {
  context.auth.removeToken();
}