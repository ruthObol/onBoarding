import { PostCard } from "../card/PostCard";
import { useState, useCallback } from "react";
import { Button, Group, Tooltip, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { NewPostForm } from "../create/NewPostForm";
import { useGetPosts } from "./hooks/useGetPosts";
import { useUserStore } from "@/stores/user-store";
import { PostFilters, FilterState } from "./filter/PostFilters";
import classes from "./PostList.module.css";


export const PostList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
      search: "",
      categories: [],
      difficulty: null,
    });
    const {posts = [], error, isLoading}= useGetPosts(filters)
    const { userName } = useUserStore();

    const handleFiltersChange = useCallback((newFilters: FilterState) => {
      setFilters(newFilters);
    }, []);

    //hook for logic


    return (
      <section className={classes.section}>
        <div className={classes.header}>
          <Group justify="space-between" align="center">
            <h2>Click & Build</h2>
            <Tooltip 
              label={!userName ? "You must be logged in to create a post" : ""}
              disabled={!!userName}
            >
              <Button 
                leftSection={<IconPlus size={16} />}
                onClick={() => setIsModalOpen(true)}
                variant="filled"
                color="blue"
                disabled={!userName}
              >
                Add New Post
              </Button>
            </Tooltip>
          </Group>
        </div>

        <Stack gap="lg">
          <PostFilters onFiltersChange={handleFiltersChange} />
          
          {!isLoading && !error && (
            <p className={classes.resultsCount}>
              Showing {posts.length} posts
            </p>
          )}
          
          {/* //clear code */}
          <div className={classes.postsContainer}>
            {error ? (
              <p className={classes.errorMessage}>Error loading posts</p>
            ) : isLoading ? (
              <p className={classes.loadingMessage}>Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className={classes.errorMessage}>No posts found matching your filters</p>
            ) : (
              <div className={classes.postsGrid}>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post}/>
                ))}
              </div>
            )}
          </div>
        </Stack>

        {userName && (
          <NewPostForm
            opened={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </section>
    );
}
