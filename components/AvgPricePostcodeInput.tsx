'use client';
import { useState } from 'react';
import { Autocomplete, Button, CloseButton, Flex, Group, TextInput } from '@mantine/core';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export function AvgPricePostcodeInput() {
    const [ac, setAc] = useState([]);
    const [postcodeError, setPostcodeError] = useState<boolean | string>(false);
    const [postcodeValue, setPostcodeValue] = useState('');

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        setPostcodeError(false);
        if (term === undefined || term === null || term === '') {
            const searchInput = document.getElementById('search') as HTMLInputElement | null;
            term = searchInput?.value ?? '';
        }
        const params = new URLSearchParams(searchParams);
        //validaate postcode using postcodes.io api to look for outcode and if not found set autocomplete field to error
        //validate postcode using postcodes.io api and set autocomplete field to error if invalid
        fetch(`https://api.postcodes.io/postcodes/${term}/validate`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result === false) {
                    fetch(`https://api.postcodes.io/outcodes/${term}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === 404) {
                                setPostcodeError("Invalid postcode");
                            }
                        });
                }
            });
        if (postcodeError !== "Invalid postcode") {
            if (term) {
                params.set('query', term);
            } else {
                params.delete('query');
            }
            replace(`${pathname}?${params.toString()}`);
        }
    }


        const fetchPostCodesData = useDebouncedCallback((term) => {
            setPostcodeError(false);
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
                    error={postcodeError}

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