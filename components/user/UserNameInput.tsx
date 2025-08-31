import { useUserStore } from '@/stores/user-store';
import { Button, Group, Modal, Text, TextInput } from '@mantine/core';
import classes from './UserNameInput.module.css';

interface UserNameInputProps {
  opened: boolean;
  onClose: () => void;
}

export const UserNameInput = ({ opened, onClose }: UserNameInputProps) => {
  const setUserName = useUserStore(store => store.setUserName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const userName = formData.get('userName');

    setUserName(userName?.toString() || '')
    onClose();
  };



  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Welcome! Please enter your name"
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <form onSubmit={handleSubmit}>
        <Text className={classes.welcomeText}>
          We'd like to know your name to personalize your experience.
        </Text>

        <TextInput
          label="Your Name"
          placeholder="Enter your name"
          required
          autoFocus
          name='userName'
          className={classes.textInput}
        />

        <Group className={classes.buttonGroup}>
          <Button type="submit">
            Continue
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
