import { Text } from '@mantine/core';

import classes from './PostPublisher.module.css';

interface PostPublisherProps {
  publisher: string;
}

export const PostPublisher = ({ publisher }: PostPublisherProps) => {
  return <Text className={classes.publisher}>Published by: {publisher}</Text>;
};
