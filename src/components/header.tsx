import { useState } from 'react';
import Link from 'next/link';
import { NextRouter } from 'next/router';
import { SettingsResponse, Tags, Tag } from '@tryghost/content-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  settings: SettingsResponse;
  router: NextRouter;
  tags: Tags;
}

const Header: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { query } = props.router;

  const onToggle = () => {
    setIsOpen((state) => !state);
  };

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
                <a className={`${query.slug === tag.slug ? 'active' : ''}`}>
                  <span>{tag.name}</span>
                  <hr />
                </a>
              </Link>
            ))}
          </div>
          <div className="header__body__mobile">
            <div className="title-group">
              <button type="button" onClick={onToggle}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <div className={`nav ${isOpen ? 'active' : ''}`}>
              <div className="zippo-container">
                <div className="nav__title-group">
                  <div className="nav__title-group__logo">
                    <Link href="/">
                      <a>
                        <img
                          src={props.settings.logo}
                          alt={props.settings.title}
                        />
                      </a>
                    </Link>
                  </div>
                  <button type="button" onClick={onToggle}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="nav__items">
                  {Array.prototype.map.call(props.tags, (tag: Tag) => (
                    <Link key={tag.id} href={`/tag/${tag.slug}`}>
                      <a
                        className={`${query.slug === tag.slug ? 'active' : ''}`}
                      >
                        <div>
                          <span>{tag.name}</span>
                          <hr />
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
