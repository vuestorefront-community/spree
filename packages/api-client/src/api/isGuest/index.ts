import { CustomQuery } from "@vue-storefront/core";

export default function isGuest(context, _params, _customQuery?: CustomQuery) {
  if (context.auth.getToken()) {
    return false;  
  }

  return true;
}
