'use client'
import classes from '../../css/Layout.module.css';
import { NavbarDesktop } from '../../components/NavbarDesktop';
import { AppShell, Box, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import PropertyTrendsLogo from '../../components/property-trends-logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <PropertyTrendsLogo />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" onClick={mobileOpened ? toggleMobile : toggleDesktop}>
        <NavbarDesktop />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className={classes.content}>
          {children}
        </div></AppShell.Main>
    </AppShell>
  );


}