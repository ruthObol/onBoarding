import { Badge, Group, Text } from '@mantine/core';

import classes from './PostHeader.module.css';

interface PostHeaderProps {
  title: string;
  buildDifficulty: string;
}

export const PostHeader = ({ title, buildDifficulty }: PostHeaderProps) => {
  return (
    <Group className={classes.header}>
      <Text className={classes.title}>{title}</Text>
      <Badge className={classes.difficultyBadge}>{buildDifficulty}</Badge>
    </Group>
  );
};
