import { Group, Text, Button } from '@mantine/core';
import { IconUser, IconLogout } from '@tabler/icons-react';
import { useUserStore } from '@/stores/user-store';

export const Header = () => {
  const { userName, clearUserName } = useUserStore();

  return (
    <header style={{
      padding: '1rem 2rem',
      borderBottom: '1px solid #e9ecef',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Group justify="space-between" align="center">
        <div>
          <Text size="xl" fw={700} c="blue">
            Click & Build
          </Text>
        </div>
        
        {userName && (
          <Group gap="sm">
            <IconUser size={20} />
            <Text size="sm" fw={500}>
              Welcome, {userName}!
            </Text>
            <Button 
              variant="subtle" 
              size="xs"
              leftSection={<IconLogout size={16} />}
              onClick={clearUserName}
            >
              Logout
            </Button>
          </Group>
        )}
      </Group>
    </header>
  );
};
