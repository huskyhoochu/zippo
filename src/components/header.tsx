import Link from 'next/link';
import { SettingsResponse } from '@tryghost/content-api';

interface Props {
  settings: SettingsResponse;
}

const Header: React.FC<Props> = ({ settings }: Props) => {
  return (
    <header className="header">
      <div className="zippo-container">
        <div className="header__body">
          <div className="header__body__logo">
            <Link href="/">
              <a>
                <img src={settings.logo} alt={settings.title} />
              </a>
            </Link>
          </div>
          <div className="header__body__nav"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
