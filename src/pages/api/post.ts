import { Params, PostOrPage, Nullable } from '@tryghost/content-api';
import api from './ghost';

async function getPost(
  data: { id: Nullable<string> } | { slug: Nullable<string> },
  options?: Params,
): Promise<void | PostOrPage> {
  return await api.posts.read(data, options).catch((err) => {
    console.error(err);
  });
}

export default getPost;
