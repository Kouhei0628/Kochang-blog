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

      <main>
        <h1>Kochang Exploration</h1>
        <h3>
          人生で新たに経験したことや、些細なものから壮大な思い出までとりあえず残しておくための個人ブログです。
        </h3>
        <p>
          サイトデザインもコンテンツも、おいおいアップデートしていきますので暖かく見守っていてくださいませ。
        </p>

        <div>
          <h2>Blogs</h2>
          {postsData.map(({ id, title, publishedAt }) => (
            <div>
              <Link href={`/posts/${id}`}>{title}</Link>
              <p>
                投稿日：
                <Date dateString={publishedAt} />
              </p>
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
