import classes from './layout.module.css';
export const siteTitle = 'Next.js Sample Website';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className={classes.container}>{children}</div>;
}
