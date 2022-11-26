import { GetStaticProps } from "next";
import Link from "next/link";
import BackTo from "../../components/BackTo";
import Date from "../../components/Date";
import { client } from "../../libs/client";
import styles from "../../styles/BlogsHome.module.scss";
import { BlogPostData } from "../../types/postTypes";

export default function Home({ postsData }: { postsData: BlogPostData[] }) {
  return (
    <main className=''>
      <h1 className='font-extrabold text-5xl'>ブログ</h1>
      <ul>
        {postsData.map(({ id, blog, updatedAt }) => (
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
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  const postsData = data.contents;
  return { props: { postsData } };
};
