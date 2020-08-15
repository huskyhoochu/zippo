import Link from 'next/link';
import { SettingsResponse, Tags, Tag } from '@tryghost/content-api';

interface Props {
  settings: SettingsResponse;
  tags: Tags;
}

const Header: React.FC<Props> = (props: Props) => {
  return (
    <header className="header">
      <div className="zippo-container">
        <div className="header__body">
          <div className="header__body__logo">
            <Link href="/">
              <a>
                <img src={props.settings.logo} alt={props.settings.title} />
              </a>
            </Link>
          </div>
          <div className="header__body__nav">
            {Array.prototype.map.call(props.tags, (tag: Tag) => (
              <Link key={tag.id} href={`/tag/${tag.slug}`}>
                <a>{tag.name}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
