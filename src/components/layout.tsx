import { SettingsResponse, Tags } from '@tryghost/content-api';
import Head from 'next/head';

import Header from './header';
import Footer from './footer';

interface Props {
  settings: SettingsResponse;
  tags: Tags;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ settings, tags, children }: Props) => {
  return (
    <div className="layout">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{settings.title}</title>
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
        <meta name="description" content={settings.description} />
        <meta property="og:description" content={settings.og_description} />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta
          property="twitter:description"
          content={settings.og_description}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="og:site_name"
          content={settings.title}
          key="site-name"
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_URL}
          key="canonical"
        />
        <meta property="og:type" content="website" key="type" />
        <meta property="og:title" content={settings.og_title} key="title" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_URL}
          key="url"
        />
        <meta property="og:image" content={settings.og_image} key="img" />
        <meta
          property="twitter:title"
          content={settings.og_title}
          key="twitter-title"
        />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_URL}
          key="twitter-url"
        />
        <meta
          property="twitter:image"
          content={settings.og_image}
          key="twitter-img"
        />
      </Head>
      <Header settings={settings} tags={tags} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
