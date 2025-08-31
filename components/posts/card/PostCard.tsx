import { Card, Image, Text, Badge, Button, Group, Stack, Modal } from '@mantine/core';//next image
import { useState } from 'react';
import classes from './PostCard.module.css';
import { Post } from '@/types';

export const PostCard = ({post}: {post: Post}) =>{
    const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <>
      <Card 
        shadow="sm" 
        padding="lg" 
        radius="md" 
        withBorder
        className={classes.card}
      >
        <Card.Section>
          <Image
            src={post.imageUrl}
            height={160}
            alt="imageUrl"
            className={classes.hoverImage}
            onClick={() => setImageModalOpen(true)}
            style={{ cursor: 'pointer' }}
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{post.title}</Text>
          <Badge color="pink">{post.buildDifficulty}</Badge>
        </Group>
        
        <Text size="xs" c="dimmed" mb="xs">
          Published by: {post.publisher}
        </Text>
       
        <Text size="sm" c="dimmed" className={classes.content}>
         {post.content}
        </Text>
        {post.postCategories && post.postCategories.length > 0 && (
          <Group gap="xs" mb="xs">
            {post.postCategories.map((postCategory) => (
              <Badge 
                key={postCategory.id} 
                color="blue" 
                variant="light"
                size="sm"
              >
                #{postCategory.category?.name}
              </Badge>
            ))}
          </Group>
        )}
        <Button 
          color="blue" 
          fullWidth 
          mt="md" 
          radius="md"
          onClick={() => window.open(`tel:${post.contactPhone}`, '_self')}//next router 
        >
          {post.contactPhone}
        </Button>
      </Card>

      <Modal
        opened={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        size="xl"
        centered
        withCloseButton
        title={post.title}
      >
        <Image
          src={post.imageUrl}
          alt={post.title}
          style={{ width: '100%', height: 'auto' }}
        />
      </Modal>
    </>
  );
}