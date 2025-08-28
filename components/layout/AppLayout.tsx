import { useState, useEffect } from 'react';
import { Header } from './Header';
import { UserNameInput } from '../user/UserNameInput';
import { useUserStore } from '@/stores/user-store';
import styles from './AppLayout.module.css';

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
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {children}
      </main>

      <UserNameInput 
        opened={showNameInput} 
        onClose={() => setShowNameInput(false)} 
      />
    </div>
  );
};
