import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import BackHome from "../../components/BackTo";
import { client } from "../../libs/client";
import styles from "../../styles/Photos.module.scss";
import { PhotoPostData } from "../../types/postTypes";

export default function Photos({ postsData }: { postsData: PhotoPostData[] }) {
  const { imagesDisplay, categories } = postsData[0];
  const router = useRouter();
  return (
    <main className=''>
      <Head>
        <title>Photo Library</title>
      </Head>
      <div>{router.query.id}</div>
      <h1 className='text-5xl font-extrabold'>フォトライブラリ</h1>
      <h3 className='mt-12 text-xl font-light'>カテゴリ別に見る</h3>
      <ul className='flex mt-8 gap-5 flex-wrap justify-start'>
        {categories.map(({ name }) => (
          <li key={name}>
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
        {imagesDisplay.map(({ title, image, itemId, category }) => (
          <li className={`relative ${styles.imglistitem}`} key={itemId}>
            <Link
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
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "photos" });
  const postsData = data.contents;
  return { props: { postsData } };
};
