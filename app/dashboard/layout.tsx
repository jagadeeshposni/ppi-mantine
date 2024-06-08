import classes from '../../css/Layout.module.css';
import { NavbarSimple } from '../../components/NavbarSimple';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={classes.layout}>
        <NavbarSimple />
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </>
  );
}