import { SettingsResponse } from '@tryghost/content-api';

import Header from './header';

interface Props {
  settings: SettingsResponse;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ settings, children }: Props) => {
  return (
    <div>
      <Header settings={settings} />
      {children}
    </div>
  );
};

export default Layout;
