import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Session } from 'next-auth';

type AppPropsWithAuth = AppProps & {
  pageProps: {
    session?: Session;
  };
};

const App = ({ Component, pageProps }: AppPropsWithAuth) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
