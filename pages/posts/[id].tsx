import Link from "next/link";
import Date from "../../components/Date";
import { client } from "../../libs/client";

type PostData = {
  title: string;
  publishedAt: string;
  updatedAt: string;
  body: string;
};

export default function Post({ post }: { post: PostData }) {
  return (
    <main>
      <h1>{post.title}</h1>
      <p>
        投稿日: <Date dateString={post.publishedAt} />
      </p>
      <p>
        更新日: <Date dateString={post.updatedAt} />
      </p>
      <div dangerouslySetInnerHTML={{ __html: `${post.body}` }}></div>
      {post && <Link href={`/`}>ホームへ戻る</Link>}
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
      post: data,
    },
  };
};
