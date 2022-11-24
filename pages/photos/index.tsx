import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { client } from "../../libs/client";
import { PhotoPostData } from "../../types/postTypes";

export default function Photos({ postsData }: { postsData: PhotoPostData[] }) {
  const { imagesDisplay, categories } = postsData[0];
  const router = useRouter();
  return (
    <main className='p-7'>
      <Head>
        <title>Photo Library</title>
      </Head>
      <div>{router.query.id}</div>
      <h1 className='text-5xl font-extrabold'>フォトライブラリ</h1>
      <h3 className='mt-12 text-xl font-light'>カテゴリ別に見る</h3>
      <ul className='flex mt-8 gap-3'>
        {categories.map(({ name }) => (
          <li key={name}>
            <Link
              className='inline-block p-4 shadow-md rounded-lg duration-150'
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
      <ul className='mt-10 flex gap-6'>
        {imagesDisplay.map(({ title, image, itemId, category }) => (
          <li className='w-40 h-40 relative' key={itemId}>
            <Link
              className='inline-block'
              href={{
                pathname: "photos/[category]/[itemId]",
                query: { category, itemId },
              }}>
              <Image
                className=' rounded-md'
                src={image.url}
                alt={`${title} の画像`}
                fill
              />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "photos" });
  const postsData = data.contents;
  return { props: { postsData } };
};
