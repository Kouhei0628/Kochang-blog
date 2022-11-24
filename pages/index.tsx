import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Date from "../components/Date";
import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";
import { BlogPostData, PhotoPostData } from "../types/postTypes";

export default function Home({
  blogPostsData,
  photoPostsData,
}: {
  blogPostsData: BlogPostData[];
  photoPostsData: PhotoPostData[];
}) {
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
          <h2 className='font-bold text-2xl mb-8'>Recent Posts</h2>
          <ul>
            {blogPostsData.map(({ id, blog, updatedAt }) => (
              <li className={styles.blogslist} key={id}>
                <Link
                  className={`bg-slate-100 block p-4 mt-3 mb-4 rounded-lg hover:bg-slate-100/50 hover:shadow-slate-300 hover:shadow-lg duration-100 ${styles.listItem}`}
                  href={`/blogs/${id}`}>
                  <h4 className='text-lg font-semibold mb-4'>{blog.title}</h4>
                  <p>
                    最終更新：
                    <Date dateString={updatedAt} />
                  </p>
                  <p>カテゴリ：{blog.category}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='navigation mt-8 mb-8'>
          <Link href={`/photos`}>See All Photos</Link>
          <ul className='flex gap-2'>
            {photoPostsData[0].categories.map(({ name }) => (
              <li key={name}>
                <Link href={`/photos/${name}`}>{name}</Link>
              </li>
            ))}
          </ul>
          <ul className='flex gap-5 mt-12'>
            {photoPostsData[0].imagesDisplay.map(
              ({ title, itemId, image, category }) => (
                <li className='' key={title}>
                  <Link
                    className='relative inline-block w-36 h-36'
                    href={`/photos/${category}/${itemId}`}>
                    <Image src={image.url} alt={`${title} の画像`} fill />
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" });
  const blogPostsData = blog.contents;
  const photo = await client.get({ endpoint: "photos" });
  const photoPostsData = photo.contents;
  return {
    props: {
      blogPostsData,
      photoPostsData,
    },
  };
};
