import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Date from "../components/Date";
import { client } from "../libs/client";

type PostData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
};

export default function Home({ postsData }: { postsData: PostData[] }) {
  return (
    <div>
      <Head>
        <title>Kochang Exploration</title>
        <meta
          name='description'
          content='This is where I write about my day to day experiences.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='p-10'>
        <h1 className='font-extrabold text-5xl pt-5 pb-7'>
          Kochang Exploration
        </h1>
        <h3 className='mt-7 mb-7'>
          人生で新たに経験したことや、些細なものから壮大な思い出までとりあえず残しておくための個人ブログです。
        </h3>
        <p>
          サイトデザインもコンテンツも、おいおいアップデートしていきますので暖かく見守っていてくださいませ。
        </p>

        <div className='mt-9'>
          <h2 className='font-bold text-3xl mb-8'>Blogs</h2>
          {postsData.map(({ id, title, publishedAt }) => (
            <div key={id}>
              <Link
                className='bg-slate-100 block p-7 mt-3 mb-4 rounded-lg hover:bg-slate-100/50 hover:shadow-slate-300 hover:shadow-lg duration-100'
                href={`/posts/${id}`}>
                <p className='font-semibold mb-4'>{title}</p>
                <p>
                  投稿日：
                  <Date dateString={publishedAt} />
                </p>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const postsData = data.contents;
  return {
    props: {
      postsData,
    },
  };
};
