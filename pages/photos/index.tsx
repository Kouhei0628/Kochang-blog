import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import BackHome from "../../components/BackTo";
import Loading from "../../components/Loading";
import { client } from "../../libs/client";
import styles from "../../styles/Photos.module.scss";
import { PhotoPostData } from "../../types/postTypes";

export default function Photos({ blogsData }: { blogsData: PhotoPostData[] }) {
  const { imagesDisplay, categories } = blogsData[0];
  const router = useRouter();
  const [listNumber, setListNumber] = useState<number>();
  return (
    <>
      <Head>
        <title>Photo Library</title>
      </Head>
      <div>{router.query.id}</div>
      <h1 className='text-5xl font-extrabold'>Photo Library</h1>
      <h3 className='mt-12 text-xl font-light'>カテゴリ別に見る</h3>
      <ul className='flex mt-8 gap-5 flex-wrap justify-start'>
        {categories.map(({ name }, i) => (
          <li
            className={`relative ${listNumber === i ? styles.imgActive : ""}`}
            key={name}>
            <Link
              className={`inline-block p-4 shadow-md shadow-slate-400 hover:shadow-slate-100 hover:shadow-lg rounded-lg duration-150 ${styles.category}`}
              href={{
                pathname: "photos/[category]",
                query: { category: name.toLowerCase() },
              }}>
              <p>{name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <h3 className='mt-12 text-xl font-light'>全ての写真</h3>
      <ul className='mt-10 flex gap-4 flex-wrap justify-start'>
        {imagesDisplay.map(({ title, image, itemId, category }, i) => (
          <li className={`relative ${styles.imglistitem}`} key={itemId}>
            <Loading active={listNumber === i} />
            <Link
              onClick={() => setListNumber(i)}
              className='inline-block'
              href={{
                pathname: "photos/[category]/[itemId]",
                query: { category, itemId },
              }}>
              <Image
                className='object-cover rounded-md hover:opacity-80 duration-300'
                src={image.url}
                alt={`${title} の画像`}
                fill
              />
            </Link>
          </li>
        ))}
      </ul>
      <BackHome to={`/`} text={"ホーム"} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await client.get({ endpoint: "photos" });
  const blogsData = data.contents;
  const data2 = await client.get({ endpoint: "photos" });
  const photosData = data2.contents;
  return { props: { blogsData, photosData } };
};
