import classes from '../../css/Layout.module.css';
import { NavbarDesktop } from '../../components/NavbarDesktop';
import { Box } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={classes.layout}>
        <Box visibleFrom='sm' >
          <NavbarDesktop />
        </Box>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </>
  );
}