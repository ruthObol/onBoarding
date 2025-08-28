import styles from './layout.module.css';
import { LayoutProps } from '../../types';

export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }: LayoutProps) {
  return <div className={styles.container}>{children}</div>;
}
