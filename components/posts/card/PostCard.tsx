import { Post } from '@/types';
import { Card, Image, Text, Badge, Button, Group, Stack, Modal } from '@mantine/core';
import { useState } from 'react';
import styles from './PostCard.module.css';

export const PostCard = ({post}: {post: Post}) =>{
    const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <>
      <Card 
        shadow="sm" 
        padding="lg" 
        radius="md" 
        withBorder
        className={styles.card}
      >
        <Card.Section>
          <Image
            src={post.imageUrl}
            height={160}
            alt="imageUrl"
            className={styles.hoverImage}
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
       
        <Text size="sm" c="dimmed" className={styles.content}>
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
          onClick={() => window.open(`tel:${post.contactPhone}`, '_self')}
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