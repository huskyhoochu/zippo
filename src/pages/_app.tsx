import type { AppProps } from 'next/app';
import Cookies from 'js-cookie';

import '../styles/main.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const display = Cookies.get('display');

  if (!display) {
    Cookies.set('display', 'light');
  }

  return <Component {...pageProps} display={display} />;
};

export default MyApp;
