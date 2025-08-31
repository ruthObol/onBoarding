import { Button } from '@mantine/core';
import classes from './PostContactButton.module.css';

interface PostContactButtonProps {
  contactPhone: string;
}

export const PostContactButton = ({ contactPhone }: PostContactButtonProps) => {
  const handleClick = () => {
    window.open(`tel:${contactPhone}`, '_self');
  };

  return (
    <Button 
      className={classes.contactButton}
      onClick={handleClick}
    >
      {contactPhone}
    </Button>
  );
};
