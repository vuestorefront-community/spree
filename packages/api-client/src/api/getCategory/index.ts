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
      console.log(e);
      throw e;
    }
  } else {
    console.log(result.fail());
    throw result.fail();
  }
}
