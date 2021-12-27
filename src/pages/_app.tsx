/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import '@src/assets/sass/layouts.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
  let pageProps = {};
  const { getInitialProps, getServerSideProps } = Component;

  const initialProps = getInitialProps && (await getInitialProps(ctx));
  const serverProps = getServerSideProps && (await getServerSideProps(ctx));

  pageProps = {
    ...pageProps,
    ...serverProps,
    ...initialProps,
  };

  return { pageProps };
};
export default MyApp;
