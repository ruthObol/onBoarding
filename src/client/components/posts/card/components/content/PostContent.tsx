import { Text } from '@mantine/core';

import classes from './PostContent.module.css';

interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  return <Text className={classes.content}>{content}</Text>;
};
