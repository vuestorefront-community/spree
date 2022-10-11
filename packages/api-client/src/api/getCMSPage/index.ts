import { ContentPage, ApiContext, GetContentPageParams } from '../../types';
import { deserializePage } from '../serializers/page';

const getPageInclude = 'cms_sections';

export default async function getCMSPage({ client, config }: ApiContext, { contentPageSlug }: GetContentPageParams): Promise<ContentPage> {
  const response = await client.pages.show({
    include: getPageInclude,
    id: contentPageSlug
  });

  if (response.isSuccess()) {
    const { data, included } = response.success();
    return deserializePage(data, included, config.backendUrl);
  } else {
    throw response.fail();
  }
}
