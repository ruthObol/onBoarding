import { useCallback, useState } from 'react';
import { Button, Group, Stack, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useUserStore } from '@/src/client/stores/user-store';
import { PostCard } from '../card/PostCard';
import { NewPostForm } from '../create/NewPostForm';
import { FilterState, PostFilters } from './filter/PostFilters';
import { useGetPosts } from './hooks/useGetPosts';
import classes from './PostList.module.css';
import { AddNewPost } from './add/AddNewPost';
import { usePostFilters } from './filter/usePostFilters';
import { usePosts } from './usePosts';

export const PostList = () => {
  const userName = useUserStore(state => state.userName);
const { handleFiltersChange, posts, isLoading, error }= usePosts()


  return (
    <section className={classes.section}>
      <div className={classes.header}>
        <Group justify='space-between' align='center'>
          <h2>Click & Build</h2>
         <AddNewPost/>
        </Group>
      </div>

      <Stack gap='lg'>
        <PostFilters onFiltersChange={handleFiltersChange} />

        {!isLoading && !error && (
          <p className={classes.resultsCount}>Showing {posts.length} posts</p>
        )}

        {/* //clear code */}
        <div className={classes.postsContainer}>
          {error ? (
            <p className={classes.errorMessage}>Error loading posts</p>
          ) : isLoading ? (
            <p className={classes.loadingMessage}>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className={classes.errorMessage}>
              No posts found matching your filters
            </p>
          ) : (
            <div className={classes.postsGrid}>
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </Stack>

      
    </section>
  );
};
