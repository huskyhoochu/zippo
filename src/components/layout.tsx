import { SettingsResponse, Tags } from '@tryghost/content-api';

import Header from './header';

interface Props {
  settings: SettingsResponse;
  tags: Tags;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ settings, tags, children }: Props) => {
  return (
    <div>
      <Header settings={settings} tags={tags} />
      {children}
    </div>
  );
};

export default Layout;
