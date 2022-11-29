import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import BackTo from "../../components/BackTo";
import Date from "../../components/Date";
import { client } from "../../libs/client";
import styles from "../../styles/BlogsHome.module.scss";
import { BlogPostData, PhotoPostData } from "../../types/postTypes";

export default function Home({
  blogsData,
  photosData,
}: {
  blogsData: BlogPostData[];
  photosData: PhotoPostData[];
}) {
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <h1 className='font-extrabold text-5xl'>Blogs</h1>
      <ul>
        {blogsData.map(({ id, blog, updatedAt }) => (
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
        ))}
      </ul>
      <BackTo to={`/`} text={`ホーム`} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  const blogsData = data.contents;
  const data2 = await client.get({ endpoint: "photos" });
  const photosData = data2.contents;
  return { props: { blogsData, photosData } };
};
