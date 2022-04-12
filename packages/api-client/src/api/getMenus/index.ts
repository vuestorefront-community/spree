import { ApiContext } from '../../types';
import axios from 'axios';
import { deserializeMenu } from '../serializers/menu';
import { Menu } from '../../types/menu';

const emptyMenu = {
  id: 0,
  name: ''
};

const getMenuInclude = 'menu_items.linked_rescource';

const findMenu = (menus: Menu[], name: string) => menus.find(e => e.name === name);

export default async function getMenus({ config }: ApiContext, { menuType: menuType, menuName: menuName, locale: locale}): Promise<Menu> {
  if (!config.spreeFeatures.useMenuApi) {
    return {isDisabled: true, ...emptyMenu};
  }

  const url = config.backendUrl.concat('/api/v2/storefront/menus');
  const result = await axios.get(url, { params: {
    include: getMenuInclude,
    'filter[location]': menuType,
    locale: locale
  }
  });

  const { included } = result.data;
  const menus = deserializeMenu(included);
  return findMenu(menus, menuName);
}
