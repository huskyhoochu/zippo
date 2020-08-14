import { PostsOrPages, Params  } from '@tryghost/content-api';

import api from './ghost';

const getPosts = async (options: Params): Promise<void | PostsOrPages> => {
  return await api.posts
    .browse(options)
    .catch(err => {
      console.error(err);
    });
};

export default getPosts;
