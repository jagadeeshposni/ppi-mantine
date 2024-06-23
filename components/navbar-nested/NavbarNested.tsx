import { Group, Code, ScrollArea, rem } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconInfoCircleFilled,
  IconCoffee,
  IconHomeStats,
} from '@tabler/icons-react';
import classes from './NavbarNested.module.css';
import { LinksGroup } from './NavbarLinksGroup';

const mockdata = [
    { link: '/dashboard', label: 'Home', icon: IconHomeStats },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

//   return (
//     <nav className={classes.navbar}>
//       <div className={classes.header}>
//         <Group justify="space-between">
//           <Logo style={{ width: rem(120) }} />
//           <Code fw={700}>v3.1.2</Code>
//         </Group>
//       </div>

//       <ScrollArea className={classes.links}>
//         <div className={classes.linksInner}>{links}</div>
//       </ScrollArea>

//       {/* <div className={classes.footer}>
//         <UserButton />
//       </div> */}
//     </nav>
//   );

return (
<nav className={classes.navbar}>
    <div className={classes.navbarMain}>
        {links}
    </div>

    <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconInfoCircleFilled className={classes.linkIcon} stroke={1.5} />
            <span>About</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconCoffee className={classes.linkIcon} stroke={1.5} />
            <span>Buy Coffee</span>
        </a>
    </div>
</nav>

);
}