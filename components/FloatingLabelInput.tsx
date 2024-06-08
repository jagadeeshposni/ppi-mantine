'use client';
import { useState } from 'react';
import { Autocomplete, TextInput } from '@mantine/core';
import classes from '../css/FloatingLabelInput.module.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export function FloatingLabelInput() {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const [ac, setAc] = useState([]);

    const floating = value.trim().length !== 0 || focused || undefined;

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


    const postCodeData = useDebouncedCallback((term) => {
        fetch(`https://api.postcodes.io/postcodes/${term}/autocomplete`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.result);
                setAc(data.result);
            });
    }, 500);

      



    return (
        <>
            {/* <TextInput
                label="Search Postcode..."
                placeholder="Postcode in UK"
                required
                classNames={classes}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                mt="md"
                autoComplete="nope"
                data-floating={floating}
                labelProps={{ 'data-floating': floating }}
            /> */}
            <Autocomplete
                placeholder="Search Postcode.."
                limit={5}
                onChange={(term) => postCodeData(term)}
                data={ac}
                mt="md"
                data-floating={floating}
                onOptionSubmit={(option) => {handleSearch(option)}}
            />

        </>
    );
}