import '@src/styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ Component, ctx, router }: any) => {
  let pageProps = {};
  const {
    getInitialProps,
    getServerSideProps,
  } = Component;

  const initialProps =
    getInitialProps && (await getInitialProps(ctx));

  const serverProps =
    getServerSideProps && (await getServerSideProps(ctx));


  pageProps = {
    ...pageProps,
    ...serverProps,
    ...initialProps,
  };

  return { pageProps }
}
export default MyApp
