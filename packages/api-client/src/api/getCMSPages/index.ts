import { PagesSearchResult, ApiContext, GetContentPagesParams } from '../../types';
import { deserializePages } from '../serializers/page';

const getPageInclude = 'cms_sections';

export default async function getCMSPages({ client, config }: ApiContext, { contentPageType }: GetContentPagesParams): Promise<PagesSearchResult> {
  const response = await client.pages.list({
    include: getPageInclude,
    filter: {
      type: contentPageType
    }
  });

  if (response.isSuccess()) {
    const { data, included } = response.success();
    return deserializePages(data, included, config.backendUrl);
  } else {
    throw response.fail();
  }
}
