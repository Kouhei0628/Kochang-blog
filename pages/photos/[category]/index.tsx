import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BackTo from "../../../components/BackTo";
import Layout from "../../../components/Layout";
import { client } from "../../../libs/client";
import { upperFirstLetter } from "../../../libs/handleString";
import styles from "../../../styles/CategoryPosts.module.scss";
import { PhotoPostData } from "../../../types/postTypes";

export default function Photos({
  photosData,
}: {
  photosData: PhotoPostData[];
}) {
  const { category } = useRouter().query;
  const { imagesDisplay } = photosData[0];
  return (
    <Layout postsData={photosData}>
      <Head>
        <title>{`Photos / ${upperFirstLetter(category as string)}`}</title>
      </Head>
      <h1 className='font-extrabold text-4xl'>
        "{upperFirstLetter(category as string)}" の画像一覧
      </h1>
      {imagesDisplay.filter(iD => iD.category[0] === category).length ? (
        <ul className='mt-10 flex gap-4 flex-wrap justify-start'>
          {imagesDisplay
            .filter(iD => iD.category[0] === category)
            .map(({ image, itemId }) => (
              <li key={itemId} className={`relative ${styles.imgListItem}`}>
                <Link
                  className='inline-block'
                  href={`/photos/${category}/${itemId}`}>
                  <Image
                    className={`object-cover hover:opacity-80 duration-300`}
                    src={image.url}
                    alt={`${itemId} の画像`}
                    fill
                  />
                </Link>
              </li>
            ))}
        </ul>
      ) : (
        <div className=' h-72 flex justify-center items-center text-center'>
          <h4 className='font-bold'>まだ投稿がありません</h4>
        </div>
      )}
      <BackTo to={`/photos`} text={`フォトライブラリ`} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await client.get({ endpoint: "photos" });
  const photosData = data.contents;
  return { props: { photosData } };
};
