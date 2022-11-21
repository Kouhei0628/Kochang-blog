import Link from "next/link";
import Date from "../../components/Date";
import { client } from "../../libs/client";
import styles from "../../styles/Post.module.scss";

type PostData = {
  title: string;
  publishedAt: string;
  updatedAt: string;
  body: string;
};

export default function Post({ postData }: { postData: PostData }) {
  return (
    <main className='p-10'>
      <h1 className='font-extrabold text-4xl pt-5 pb-7'>{postData.title}</h1>
      <div className='flex gap-6'>
        <p className='text-slate-400'>
          <Date dateString={postData.publishedAt} />
        </p>
        <p className='text-slate-400'>
          更新日: <Date dateString={postData.updatedAt} />
        </p>
      </div>

      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: `${postData.body}` }}></div>
      {postData && <Link href={`/`}>ホームへ戻る</Link>}
    </main>
  );
}
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map(
    (content: { id: string }) => `/posts/${content.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  return {
    props: {
      postData: data,
    },
  };
};
