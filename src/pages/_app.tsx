import type { AppProps } from 'next/app';

import '../styles/main.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
