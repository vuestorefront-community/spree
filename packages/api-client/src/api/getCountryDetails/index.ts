import { ApiContext } from '../../types';
import { Country } from '../../types/country';
import { deserializeCountry } from '../serializers/country';

export default async function getCountryDetails({ client }: ApiContext, { iso }): Promise<Country> {
  const result = await client.countries.show(iso, { include: 'states' });
  if (result.isSuccess()) {
    const includedStates = result.success().included;
    const apiCountry = result.success().data;
    return deserializeCountry(apiCountry, includedStates);
  } else {
    throw result.fail();
  }
}
