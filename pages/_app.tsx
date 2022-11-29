import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/global.scss";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Kochang Exploration</title>
        <meta charSet='utf-8' />
        <link rel='shortcut icon' href='./favicon.ico' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='Kochangのゆるく気ままにブログです。思い出の写真や気になったニュース、くだらないどうでもいい独り言まで思いのままに更新していきます。'
        />
        <meta property='og:url' content='https://kochang-blog.vercel.app/' />
        <meta property='og:title' content='Kochang Exploration' />
        <meta property='og:type' content='blog' />
        <meta
          property='og:description'
          content='Kochangのゆるく気ままにブログです。思い出の写真や気になったニュース、くだらないどうでもいい独り言まで思いのままに更新していきます。'
        />
        <meta
          property='og:image'
          content='https://images.microcms-assets.io/assets/050ab3ccb2ed4321a3a930824bbe7f64/e36c4ca2758c4ddbbd5ac7977c3ff694/K2%3Ffit%3Dcrop%26w%3D300%26h%3D157.jpg'
        />
        <meta property='og:site_name' content='Kochang Exploration' />
        <meta property='og:local' content='ja_JP' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
