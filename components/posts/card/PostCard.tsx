import { Card, Stack } from '@mantine/core';
import { Post } from '@/types';
import classes from './PostCard.module.css';
import { PostImage } from './components/image/PostImage';
import { PostHeader } from './components/header/PostHeader';
import { PostPublisher } from './components/publisher/PostPublisher';
import { PostContent } from './components/content/PostContent';
import { PostCategories } from './components/categories/PostCategories';
import { PostContactButton } from './components/contact/PostContactButton';

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