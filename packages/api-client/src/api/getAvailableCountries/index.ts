import { CustomQuery } from "@vue-storefront/core";
import { deserializeCountry } from '../serializers/country';

export default async function getAvailableCountries(context, _params, _customQuery?: CustomQuery) {
  const result = await context.client.countries.list({ include: 'states' });
  if (result.isSuccess()) {
    return result.success().data.map(c => deserializeCountry(c, []));
  } else {
    throw result.fail();
  }
}