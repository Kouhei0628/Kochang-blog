import { GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "../../../libs/client";
import { upperFirstLetter } from "../../../libs/handleString";
import { PhotoPostData } from "../../../types/postTypes";

export default function Photos({
  photosData,
}: {
  photosData: PhotoPostData[];
}) {
  const { category } = useRouter().query;
  return (
    <main>
      <Head>
        <title>{`Photos / ${upperFirstLetter(category as string)}`}</title>
      </Head>
      Router is "{category}"
    </main>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "photos" });
  const photosData = data.contents;
  return { props: { photosData } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "photos" });
  const paths = data.contents[0].categories.map(
    ({ name }: { name: string }) => `/photos/${name.toLowerCase()}`
  );
  return {
    paths,
    fallback: false,
  };
};
