import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Date from "../../../components/Date";
import { client } from "../../../libs/client";
import { PhotoPostData } from "../../../types/postTypes";

export default function Post({ photoData }: { photoData: PhotoPostData[] }) {
  const route = useRouter();
  const { imagesDisplay } = photoData[0];
  const data = imagesDisplay
    .filter(ID => ID.itemId === route.query.itemId)
    .map(ID => ID);
  const { image, title, upload } = data[0];
  return (
    <>
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await client.get({ endpoint: "photos" });
  const photoData = data.contents;
  return { props: { photoData } };
};
