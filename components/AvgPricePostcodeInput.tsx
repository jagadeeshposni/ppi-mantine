'use client';
import { useState } from 'react';
import { Autocomplete, Button, Flex, Group, TextInput } from '@mantine/core';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export function AvgPricePostcodeInput() {
    const [ac, setAc] = useState([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        if (term === undefined || term === null || term === '') {
            const searchInput = document.getElementById('search') as HTMLInputElement | null;
            term = searchInput?.value ?? '';
            console.log(term);
        }
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
                setAc(data.result);
            });
    }, 500);

    return (
        <Flex
            mih={50}
            gap="xl"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"
        >
            <Autocomplete
                id="search"
                label="Search Postcode"
                placeholder="Start typing..."
                limit={5}
                onChange={(term) => fetchPostCodesData(term)}
                data={ac}
                onOptionSubmit={(option) => { handleSearch(option) }}
                defaultValue={searchParams.get('query')?.toString()}

            />
            <Button
                autoContrast
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                size='sm'
                radius={5}
                mt={10}
                onClick={() => { handleSearch('') }}
            >
                Submit
            </Button>
        </Flex>


    );
}