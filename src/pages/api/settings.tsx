import { SettingsResponse } from '@tryghost/content-api';
import api from './ghost';

async function getSettings(): Promise<void | SettingsResponse> {
  return await api.settings
    .browse()
    .catch((err) => {
      console.error(err);
    });
}

export default getSettings;
