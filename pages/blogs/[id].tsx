import { MicroCMSImage } from "microcms-js-sdk";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import BackTo from "../../components/BackTo";
import Date from "../../components/Date";
import { client } from "../../libs/client";
import styles from "../../styles/Post.module.scss";
import { BlogPostData, PhotoPostData } from "../../types/postTypes";

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

export default function Post({
  blogData,
  photosData,
}: {
  blogData: PostData;
  photosData: PhotoPostData[];
}) {
  const { title, mainvisual, category, body } = blogData.blog;
  return (
    <main className=''>
      <Head>
        <title>{title}</title>
        <link
          rel='icon'
          href={
            photosData[0].imagesUi.filter(IU => IU.use[0] === "favicon")[0]
              .image.url
          }
        />
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
          投稿日: <Date dateString={blogData.publishedAt} />
        </p>
        <p className='text-slate-400'>
          更新日: <Date dateString={blogData.updatedAt} />
        </p>
        <br />
        <p>カテゴリ：{category}</p>
      </div>

      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: `${body}` }}></div>
      {blogData && <BackTo to={`/blogs`} text={`ブログ一覧`} />}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  blogData: BlogPostData;
  photosData: PhotoPostData[];
}> = async ({ params }) => {
  if (params) {
    const id = params.id as string;
    const blogData = await client.get({ endpoint: "blog", contentId: id });
    const data = await client.get({ endpoint: "photos" });
    const photosData = data.contents;
    return {
      props: {
        blogData,
        photosData,
      },
    };
  }
  return { props: { blogData: null, photosData: null } };
};
