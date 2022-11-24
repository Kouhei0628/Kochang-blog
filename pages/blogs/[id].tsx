import { MicroCMSImage } from "microcms-js-sdk";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Date from "../../components/Date";
import { client } from "../../libs/client";
import styles from "../../styles/Post.module.scss";

type PostData = {
  blog: {
    title: string;
    mainvisual: MicroCMSImage;
    category: string;
    body: string;
  };
  publishedAt: string;
  updatedAt: string;
};

export default function Post({ postData }: { postData: PostData }) {
  const { title, mainvisual, category, body } = postData.blog;
  return (
    <main className='p-10'>
      <Head>
        <title>{title}</title>
      </Head>
      <Image
        src={`${mainvisual.url}`}
        alt={`${title}のメインビジュアル`}
        width={mainvisual.width}
        height={mainvisual.height}
        priority
      />
      <h1 className='font-extrabold text-4xl pt-5 pb-7'>{title}</h1>
      <div className={styles.date}>
        <p className='text-slate-400'>
          投稿日: <Date dateString={postData.publishedAt} />
        </p>
        <p className='text-slate-400'>
          更新日: <Date dateString={postData.updatedAt} />
        </p>
        <br />
        <p>カテゴリ：{category}</p>
      </div>

      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: `${body}` }}></div>
      {postData && (
        <Link className={`mt-10 inline-block ${styles.back}`} href={`/`}>
          ← ホームへ戻る
        </Link>
      )}
    </main>
  );
}
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map(
    (content: { id: string }) => `/blogs/${content.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      postData: data,
    },
  };
};
