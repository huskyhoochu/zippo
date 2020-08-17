import { useRef, useEffect, useMemo, useState } from 'react';
import { SettingsResponse, Tags } from '@tryghost/content-api';
import { NextRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import Header from './header';
import Footer from './footer';

interface Props {
  settings: SettingsResponse;
  tags: Tags;
  router: NextRouter;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props: Props) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (layoutRef.current && Cookies.get('display') === 'dark') {
      layoutRef.current.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  return (
    <div className="layout" ref={layoutRef}>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{props.settings.title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_package/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_package/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_package/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon_package/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon_package/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content={props.settings.description} />
        <meta
          property="og:description"
          content={props.settings.og_description}
        />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta
          property="twitter:description"
          content={props.settings.og_description}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="og:site_name"
          content={props.settings.title}
          key="site-name"
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
        <meta property="og:type" content="website" key="type" />
        <meta
          property="og:title"
          content={props.settings.og_title}
          key="title"
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_URL}
          key="url"
        />
        <meta property="og:image" content={props.settings.og_image} key="img" />
        <meta
          property="twitter:title"
          content={props.settings.og_title}
          key="twitter-title"
        />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_URL}
          key="twitter-url"
        />
        <meta
          property="twitter:image"
          content={props.settings.og_image}
          key="twitter-img"
        />
      </Head>
      <Header {...props} isDark={isDark} setIsDark={setIsDark} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
