'use client';
import { useState } from 'react';
import { Autocomplete, TextInput } from '@mantine/core';
import classes from '../css/FloatingLabelInput.module.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export function FloatingLabelInput() {
    const [ac, setAc] = useState([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        console.info('searching for', term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };


    const fetchPostCodesData = useDebouncedCallback((term) => {
        fetch(`https://api.postcodes.io/postcodes/${term}/autocomplete`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.result);
                setAc(data.result);
            });
    }, 500);

    return (
        <>
            <Autocomplete
                placeholder="Search Postcode.."
                limit={5}
                onChange={(term) => fetchPostCodesData(term)}
                data={ac}
                mt="md"
                onOptionSubmit={(option) => { handleSearch(option) }}
            />

        </>
    );
}