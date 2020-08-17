import { Params, Tags } from '@tryghost/content-api';

import api from './ghost';

const getTags = async (options: Params): Promise<void | Tags> => {
  return await api.tags.browse(options).catch((err) => {
    console.error(err);
  });
};

export default getTags;
