import { Button, Group, Text } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';

import { useUserStore } from '@/src/client/stores/user-store';

import classes from './UserDetails.module.css';

export const UserDetails = () => {
  const userName = useUserStore(state => state.userName);
  const clearUserName = useUserStore(state => state.clearUserName);

  return (
    <Group className={classes.userSection}>
      <IconUser size={20} />
      <Text className={classes.userText}>Welcome, {userName}!</Text>
      <Button
        className={classes.logoutButton}
        onClick={clearUserName}
        leftSection={<IconLogout size={16} />}
        variant='subtle'
        size='sm'
      >
        Logout
      </Button>
    </Group>
  );
};
