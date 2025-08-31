import { ReactNode } from 'react';
import { Header } from '../header/Header';
import classes from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={classes.container}>
      <Header />
      <main className={classes.main}>
        {children}
      </main>
    </div>
  );
};
