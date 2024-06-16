'use client';
import { useState } from 'react';
import { Autocomplete, Button, CloseButton, Flex, Group, TextInput } from '@mantine/core';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export default function AvgPricePostcodeInput() {
    const [ac, setAc] = useState([]);
    const [postcodeError, setPostcodeError] = useState<boolean>(false);
    const [postcodeInput, setPostcodeInput] = useState('');

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = async (term: string) => {
        console.debug('searching for postcode' + term);
        setPostcodeError(false);
        const params = new URLSearchParams(searchParams);
        const response = await fetch(`https://api.postcodes.io/postcodes/${term}/validate`);
        const data = await response.json();
        if (data.result === false) {
            const outcodeResponse = await fetch(`https://api.postcodes.io/outcodes/${term}`);
            const outcodeData = await outcodeResponse.json();
            if (outcodeData.status === 404) {
                setPostcodeError(true);
            } else {
                if (!postcodeError) {
                    if (term) {
                        params.set('query', term);
                        params.set('type', 'outcode');
                    } else {
                        params.delete('query');
                        params.delete('type');
                    }
                    replace(`${pathname}?${params.toString()}`);
                }
            }
        }else{
            if (!postcodeError) {
                if (term) {
                    params.set('query', term);
                    params.set('type', 'postcode');
                } else {
                    params.delete('query');
                    params.delete('type');

                }
                replace(`${pathname}?${params.toString()}`);
            }
        }
    }

    const fetchPostCodesData = useDebouncedCallback((term) => {
        fetch(`https://api.postcodes.io/postcodes/${term}/autocomplete`)
            .then((response) => response.json())
            .then((data) => {
                setAc(data.result);
            });
    }, 500);
   
    const handleChange = (term: string) => {
        setPostcodeInput(term);
        setPostcodeError(false);
        fetchPostCodesData(term);
    }

    return (
        <Flex
            mih={75}
            gap="xl"
            justify="center"
            align="flex-end"
            direction="row"
            wrap="wrap"

        >
            <Autocomplete
            size='xs'
                id="search"
                label="Search Postcode/Postcode Area"
                placeholder="Start typing..."
                limit={10}
                onChange={(term) => handleChange(term)}
                data={ac}
                onOptionSubmit={(option) => { handleSearch(option) }}
                defaultValue={searchParams.get('query')?.toString()}
                error={postcodeError? 'Invalid Postcode' : false}

            />

            <Button
                autoContrast
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                size='sm'
                radius={5}
                mt={10}
                onClick={() => { handleSearch(postcodeInput) }}
            >
                Submit
            </Button>
        </Flex>


    );
}