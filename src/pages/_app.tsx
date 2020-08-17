import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';

import '../styles/main.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <CookiesProvider>
      <Component {...pageProps} />;
    </CookiesProvider>
  );
};

export default MyApp;
