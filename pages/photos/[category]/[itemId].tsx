import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { client } from "../../../libs/client";
import { PhotoPostData } from "../../../types/postTypes";

export default function Post({ photoData }: { photoData: PhotoPostData[] }) {
  const route = useRouter();
  return <main>{route.query.itemId}</main>;
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "photos" });
  const paths = data.contents[0].imagesDisplay.map(
    ({ itemId, category }: { itemId: string; category: string[] }) =>
      `/photos/${category[0]}/${itemId}`
  );
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "photos" });
  const photoData = data.contents;
  return { props: { photoData } };
};
