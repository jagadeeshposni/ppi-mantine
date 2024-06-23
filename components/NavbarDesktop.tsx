'use client';
import {
    IconCoffee,
    IconCurrencyPound,
    IconHomeStats,
    IconInfoCircleFilled,
    IconMathAvg
} from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import classes from '../css/NavbarSimple.module.css';

const data = [
    { id: 1, link: '/dashboard', label: 'Home', icon: IconHomeStats },
    { id: 2, link: '/dashboard/average-price', label: 'Average Price', icon: IconMathAvg },
    { id: 3, link: '/dashboard/average-price?type=postcode', label: 'By Postcode', icon: IconMathAvg, nested: true },
    { id: 4, link: '/dashboard/average-price?type=area', label: 'By Area', icon: IconMathAvg, nested: true },
    { id: 5, link: '/dashboard/price-paid', label: 'Price Paid', icon: IconCurrencyPound },
    { id: 6, link: '/dashboard/price-paid?type=postcode', label: 'By Postcode', icon: IconCurrencyPound, nested: true },
    { id: 7, link: '/dashboard/price-paid?type=area', label: 'By Area', icon: IconCurrencyPound, nested: true },
];

export function NavbarDesktop() {
    // const searchParams = useSearchParams();
    // const params = new URLSearchParams(searchParams);

    const [active, setActive] = useState(0);

    const links = data.map((item) => (
        <Link
        
            className={item.nested ? classes.nestedLink : classes.link}
            data-active={item.id === active || undefined}
            // href={`${item.link}?${params.toString()}`}
            href = {item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.id);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (<>
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
    </>

    );
}