import { Badge, Group } from '@mantine/core';

import classes from './PostCategories.module.css';

interface PostCategory {
  id: number;
  category: {
    name: string;
    id: number;
  };
}

interface PostCategoriesProps {
  postCategories: PostCategory[];
}

export const PostCategories = ({ postCategories }: PostCategoriesProps) => {
  if (!postCategories || postCategories.length === 0) {
    return null;
  }

  return (
    <Group className={classes.categoriesContainer}>
      {postCategories.map(postCategory => (
        <Badge key={postCategory.id} className={classes.categoryBadge}>
          #{postCategory.category.name}
        </Badge>
      ))}
    </Group>
  );
};
