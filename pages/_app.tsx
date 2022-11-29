import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/global.scss";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <link rel='shortcut icon' href='./favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
