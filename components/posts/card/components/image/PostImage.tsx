import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@mantine/core';
import classes from './PostImage.module.css';

interface PostImageProps {
  imageUrl: string;
  title: string;
}

export const PostImage = ({ imageUrl, title }: PostImageProps) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <>
      <div className={classes.imageContainer}>
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={160}
          className={classes.image}
          onClick={() => setImageModalOpen(true)}
        />
      </div>

      <Modal
        opened={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        size="xl"
        centered
        withCloseButton
        title={title}
      >
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto' }}
        />
      </Modal>
    </>
  );
};
