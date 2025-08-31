import { useState, useEffect } from 'react';
import { Header } from './Header';
import { UserNameInput } from '../user/UserNameInput';
import { useUserStore } from '@/stores/user-store';
import classes from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { userName } = useUserStore();
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    if (!userName) {
      setShowNameInput(true);
    }
  }, [userName]);

  return (
    <div className={classes.container}>
      <Header />
      
      <main className={classes.main}>
        {children}
      </main>

      <UserNameInput 
        opened={showNameInput} 
        onClose={() => setShowNameInput(false)} 
      />
    </div>
  );
};
