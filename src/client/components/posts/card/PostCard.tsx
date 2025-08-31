import { Card, Stack } from '@mantine/core';

import { Post } from '@/src/types';

import { PostCategories } from './components/categories/PostCategories';
import { PostContactButton } from './components/contact/PostContactButton';
import { PostContent } from './components/content/PostContent';
import { PostHeader } from './components/header/PostHeader';
import { PostImage } from './components/image/PostImage';
import { PostPublisher } from './components/publisher/PostPublisher';
import classes from './PostCard.module.css';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card className={classes.card}>
      <PostImage imageUrl={post.imageUrl} title={post.title} />

      <Stack className={classes.cardContent}>
        <PostHeader title={post.title} buildDifficulty={post.buildDifficulty} />
        <PostPublisher publisher={post.publisher} />
        <PostContent content={post.content} />
        <PostCategories postCategories={post.postCategories || []} />
        <PostContactButton contactPhone={post.contactPhone} />
      </Stack>
    </Card>
  );
};
