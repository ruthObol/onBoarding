import { AppLayout } from '@/components/layout/AppLayout';
import { PostList } from '@/components/posts/list/PostList';
import Head from 'next/head';

export default function Home() {
  return (
    <AppLayout>
      <Head>
        <title>Lego Lovers Blog</title>
      </Head>

      <PostList />
    </AppLayout>
  );
}
