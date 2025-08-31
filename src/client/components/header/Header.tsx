import { UserDetails } from '@/src/client/components/user/details/UserDetails';
import { Text } from '@mantine/core';
import { useUserStore } from '../../stores/user-store';
import { UserNameInput } from '../user/logIn/UserNameInput';
import { useUserInput } from '../user/logIn/useUserInput';
import classes from './Header.module.css';

export const Header = () => {
  const userName = useUserStore((state) => state.userName);
  const { showNameInput, closeNameInput } = useUserInput()

  return (
    <header className={classes.header}>
      <div className={classes.group}>
        <Text component="h1" className={classes.title}>
          Click & Build
        </Text>
        {userName && <UserDetails />}
        <UserNameInput
          opened={showNameInput}
          onClose={closeNameInput}
        />
      </div>
    </header>
  );
};
