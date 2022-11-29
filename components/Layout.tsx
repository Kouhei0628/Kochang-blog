import Head from "next/head";
import React from "react";
import styles from "../styles/Layout.module.scss";
import { PhotoPostData } from "../types/postTypes";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({
  children,
  postsData,
}: {
  children: React.ReactNode;
  postsData: PhotoPostData[];
}) {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='This is where I write about my day to day experiences.'
        />
        <link
          rel='icon'
          href={
            postsData[0].imagesUi.filter(IU => IU.use[0] === "favicon")[0].image
              .url
          }
        />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
