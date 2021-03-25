import { ApiContext } from '../../types';

export default async function logOut({ config }: ApiContext) {
  await config.auth.removeToken();
}
