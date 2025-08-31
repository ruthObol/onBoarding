import { IconUser, IconLogout } from '@tabler/icons-react';
import { useUserStore } from '@/stores/user-store';
import styles from './Header.module.css';

export const Header = () => {
  const { userName, clearUserName } = useUserStore();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>
            Click & Build
          </h1>
        </div>
        
        {userName && (
          <div className={styles.userSection}>
            <IconUser size={20} />
            <span className={styles.userText}>
              Welcome, {userName}!
            </span>
            <button 
              className={styles.logoutButton}
              onClick={clearUserName}
            >
              <IconLogout size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
