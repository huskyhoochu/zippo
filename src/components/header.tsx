import { useState, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { NextRouter } from 'next/router';
import { SettingsResponse, Tags, Tag } from '@tryghost/content-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

interface Props {
  settings: SettingsResponse;
  router: NextRouter;
  tags: Tags;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { query } = props.router;

  const onToggle = () => {
    setIsOpen((state) => !state);
  };

  const onLightDark = () => {
    if (typeof window != 'undefined') {
      const layout = document.getElementsByClassName('layout');

      if (props.isDark) {
        layout[0].classList.remove('dark');
        Cookies.set('display', 'light', {
          expires: 365,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        props.setIsDark(false);
      } else {
        layout[0].classList.add('dark');
        Cookies.set('display', 'dark', {
          expires: 365,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        props.setIsDark(true);
      }
    }
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
            <button type="button" className="toggle" onClick={onLightDark}>
              <FontAwesomeIcon icon={props.isDark ? faMoon : faSun} />
            </button>
          </div>
          <div className="header__body__mobile">
            <div className="title-group">
              <button type="button" className="toggle" onClick={onLightDark}>
                <FontAwesomeIcon icon={props.isDark ? faMoon : faSun} />
              </button>
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
