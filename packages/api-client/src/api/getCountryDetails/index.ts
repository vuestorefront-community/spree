import { ApiContext } from '../../types';
import { deserializeCountry } from '../serializers/country';

export default async function getAvailableCountries({ client }: ApiContext, { iso }) {
  const result = await client.countries.show(iso, { include: 'states' });
  if (result.isSuccess()) {
    const includedStates = result.success().included;
    const apiCountry = result.success().data;
    return deserializeCountry(apiCountry, includedStates);
  } else {
    throw result.fail();
  }
}
