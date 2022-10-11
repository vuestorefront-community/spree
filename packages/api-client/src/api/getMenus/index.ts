import { ApiContext } from '../../types';
import { deserializeMenu } from '../serializers/menu';
import { Menu } from '../../types/menu';

const emptyMenu = {
  id: 0,
  name: ''
};

const getMenuInclude = 'menu_items.linked_rescource';

const findMenu = (menus: Menu[], name: string) => menus.find(e => e.name === name);

export default async function getMenus({ client, config }: ApiContext, { menuType: menuType, menuName: menuName }): Promise<Menu> {
  if (!config.spreeFeatures.useMenuApi) {
    return {isDisabled: true, ...emptyMenu};
  }

  const response = await client.menus.list({
    include: getMenuInclude,
    filter: {
      location: menuType
    }
  });

  if (response.isSuccess()) {
    const { included } = response.success();
    const menus = deserializeMenu(included);
    return findMenu(menus, menuName);
  } else {
    throw response.fail();
  }
}
