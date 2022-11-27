import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Date from "../../../components/Date";
import { client } from "../../../libs/client";
import { PhotoPostData } from "../../../types/postTypes";

export default function Post({ photoData }: { photoData: PhotoPostData[] }) {
  const route = useRouter();
  const { imagesDisplay, categories } = photoData[0];
  const data = imagesDisplay
    .filter(ID => ID.itemId === route.query.itemId)
    .map(ID => ID);
  const { image, title, upload } = data[0];
  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Image
          priority
          src={image.url}
          alt={title}
          width={image.width}
          height={image.height}
        />
        <h2 className='mt-10'>{title}</h2>
        <p>
          投稿日：
          <Date dateString={upload} />
        </p>
      </div>
    </main>
  );
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
