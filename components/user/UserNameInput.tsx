import { useState } from 'react';
import { Modal, TextInput, Button, Group, Text } from '@mantine/core';
import { useUserStore } from '@/stores/user-store';

interface UserNameInputProps {
  opened: boolean;
  onClose: () => void;
}

export const UserNameInput = ({ opened, onClose }: UserNameInputProps) => {
  const [name, setName] = useState('');
  const { setUserName } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name.trim());
      onClose();
    }
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
        <Text size="sm" c="dimmed" mb="md">
          We'd like to know your name to personalize your experience.
        </Text>
        
        <TextInput
          label="Your Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
          mb="md"
        />
        
        <Group justify="flex-end">
          <Button type="submit" disabled={!name.trim()}>
            Continue
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
