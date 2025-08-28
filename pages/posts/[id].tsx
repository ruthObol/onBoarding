import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { Date } from '../../components/date/date';
import Layout from '../../components/layout/layout';
import { getAllPostIds, getPost } from '../../server/post/dal/posts-dal';
import utilStyles from '../../styles/utils.module.css';
import { PostPageProps } from '../../types';

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  try {
    const postData = await getPost(params?.id as string);

    return {
      props: {
        postData,
      },
      revalidate: 60, // Revalidate every 60 seconds for ISR
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: 'blocking', // Enable ISR for new posts
  };
};

export default function Post({ postData }: PostPageProps) {
  return (
    <Layout>
      <div>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.createdAt.toISOString()} />
          </div>
          <div className={utilStyles.lightText}>
            <p>Lego Model: {postData.legoModelNumber}</p>
            {postData.pieces && <p>Pieces: {postData.pieces}</p>}
            <p>Difficulty: {postData.buildDifficulty}</p>
            <p>Contact: {postData.contactPhone}</p>
            <p>Published by: {postData.publisher}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        </article>
      </div>
    </Layout>
  );
}
