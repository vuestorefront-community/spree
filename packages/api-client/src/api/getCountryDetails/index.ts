import { CustomQuery } from "@vue-storefront/core";
import { deserializeCountry } from '../serializers/country';

export default async function getAvailableCountries(context, { iso }, _customQuery?: CustomQuery) {
  const result = await context.client.countries.show(iso, { include: 'states' });
  if (result.isSuccess()) {
    const includedStates = result.success().included;
    const apiCountry = result.success().data;
    return deserializeCountry(apiCountry, includedStates);
  } else {
    throw result.fail();
  }
}