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
import Link from 'next/link';

const data = [
    { link: '/dashboard/', label: 'Home', icon: IconHomeStats },
    { link: '/dashboard/average-price', label: 'Average Price', icon: IconMathAvg },
    { link: '/dashboard/price-paid', label: 'Price Paid', icon: IconCurrencyPound },
];

export function NavbarDesktop() {
    const [active, setActive] = useState('National Stats');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                // event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (<>            <div className={classes.navbarMain}>
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
    </>

    );
}