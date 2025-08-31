import Head from 'next/head';

import { AppLayout } from '@/src/client/components/layout/AppLayout';
import { PostList } from '@/src/client/components/posts/list/PostList';

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
