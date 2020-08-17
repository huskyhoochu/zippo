import { Params, Tag, Nullable } from '@tryghost/content-api';
import api from './ghost';

async function getTag(
  data: { id: Nullable<string> } | { slug: Nullable<string> },
  options?: Params,
): Promise<void | Tag> {
  return await api.tags.read(data, options).catch((err) => {
    console.error(err);
  });
}

export default getTag;
