import { useState } from 'react';
import Image from 'next/image';
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

      {imageModalOpen && (
        <div className={classes.modalOverlay} onClick={() => setImageModalOpen(false)}>
          <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modalHeader}>
              <h3 className={classes.modalTitle}>{title}</h3>
              <button 
                className={classes.closeButton}
                onClick={() => setImageModalOpen(false)}
              >
                ×
              </button>
            </div>
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={600}
              className={classes.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
};
