'use client';
import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
    IconHomeStats,
    IconCurrencyPound,
    IconMathAvg,
    IconInfoCircleFilled,
    IconCoffee
} from '@tabler/icons-react';
import classes from '../css/NavbarSimple.module.css';
import Image from 'next/image';
import PropertyTrendsLogo from './property-trends-logo';

const data = [
    { link: '', label: 'National Stats', icon: IconHomeStats },
    { link: '', label: 'Average Price', icon: IconMathAvg },
    { link: '', label: 'Price Paid', icon: IconCurrencyPound },
];

export function NavbarSimple() {
    const [active, setActive] = useState('National Stats');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    <PropertyTrendsLogo />
                    {/* <Code fw={700}>v0.0.1</Code> */}
                </Group>
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