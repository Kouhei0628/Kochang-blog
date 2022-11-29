import { GetServerSideProps } from "next";
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
    <>
      <Head>
        <title>Kochang Exploration</title>
      </Head>

      <main className=''>
        <h1 className={`text-center pt-5 pb-7 ${styles.mainTitle}`}>
          Kochang Exploration
        </h1>
        <p className='mt-7 mb-7'>
          人生で新たに経験したことや、些細なものから壮大な思い出までとりあえず残しておくための個人ブログです。
        </p>
        <p>
          サイトデザインもコンテンツも、おいおいアップデートしていきますので暖かく見守っていてくださいませ。
        </p>

        <div className='mt-9'>
          <h2 className='mb-8'>Recent Posts</h2>
          <Link className='font-semibold text-xl underline' href={`/blogs`}>
            See All Blogs
          </Link>
          <ul>
            {blogPostsData.map(({ id, blog, updatedAt }, i) =>
              i < 4 ? (
                <li className={styles.blogslist} key={id}>
                  <Link
                    className={`block p-4 mt-3 mb-4 ${styles.listItem}`}
                    href={`/blogs/${id}`}>
                    <h4 className='text-lg font-semibold mb-4'>{blog.title}</h4>
                    <p>
                      Updated at: <Date dateString={updatedAt} />
                    </p>
                    <p>Category: {blog.category}</p>
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className='navigation mt-16 mb-8'>
          <h2 className='font-bold text-2xl mb-8'>Recent Photos</h2>
          <Link className='font-semibold text-xl underline' href={`/photos`}>
            See All Photos
          </Link>
          <ul className='w-full flex flex-wrap gap-2 mt-12 justify-between'>
            {photoPostsData[0].imagesDisplay.map(
              ({ title, itemId, image, category }, i) =>
                i < 6 ? (
                  <li className='' key={title}>
                    <Link
                      className='relative inline-block w-32 h-32'
                      href={`/photos/${category}/${itemId}`}>
                      <Image
                        className='object-cover rounded-md hover:opacity-80 duration-300'
                        src={image.url}
                        alt={`${title} の画像`}
                        fill
                      />
                    </Link>
                  </li>
                ) : null
            )}
          </ul>
        </div>
      </main>

      <footer></footer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
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
