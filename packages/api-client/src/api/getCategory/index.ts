import { Logger } from '@vue-storefront/core';
import { ApiContext, Category, CategorySearchResult, GetCategoryParams } from '../../types';
import { deserializeCategories } from '../serializers/category';

const findCategory = (categories: Category[], slug: string) => categories.find(e => e.slug === slug);

export default async function getCategory({ client }: ApiContext, { categorySlug }: GetCategoryParams): Promise<CategorySearchResult> {
  const result = await client.taxons.list({ fields: { taxon: 'name,permalink,children,parent,is_root' }, per_page: 500 });

  if (result.isSuccess()) {
    try {
      const data = result.success().data;
      const categories = deserializeCategories(data);

      return {
        root: findCategory(categories, 'categories'),
        current: findCategory(categories, categorySlug)
      };
    } catch (e) {
      Logger.error(e);
      throw e;
    }
  } else {
    Logger.error(result.fail());
    throw result.fail();
  }
}
