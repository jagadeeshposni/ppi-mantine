'use client';
import { Autocomplete, Button, Flex } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';


export default function PostCodeInput({ page }: { page: string }) {
    const [ac, setAc] = useState([]);
    const [postcodeError, setPostcodeError] = useState<boolean>(false);
    const [postcodeInput, setPostcodeInput] = useState('');

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const type = searchParams.get('type')


    console.log('page', page);

    // const handleSearch = async (term: string) => {
    //     console.debug('searching for postcode' + term);
    //     setPostcodeError(false);
    //     const params = new URLSearchParams(searchParams);
    //     const response = await fetch(`https://api.postcodes.io/postcodes/${term}/validate`);
    //     const data = await response.json();
    //     if (data.result === false) {
    //         // Disabling outcode search when the input request is coming from pricePaidData page. Reason: Outcode search would result in large amount of data
    //         // and it's not user friendly to display all the data at once as I am thinking of showing it a bar chart.

    //         if (page === 'pricePaidData') {
    //             setPostcodeError(true);
    //         }
    //         const outcodeResponse = await fetch(`https://api.postcodes.io/outcodes/${term}`);
    //         const outcodeData = await outcodeResponse.json();
    //         if (outcodeData.status === 404) {
    //             setPostcodeError(true);
    //         } else {
    //             if (!postcodeError) {
    //                 if (term) {
    //                     params.set('query', term);
    //                     params.set('type', 'outcode');
    //                 } else {
    //                     params.delete('query');
    //                     params.delete('type');
    //                 }
    //                 replace(`${pathname}?${params.toString()}`);
    //             }
    //         }
    //     } else {
    //         if (!postcodeError) {
    //             if (term) {
    //                 params.set('query', term);
    //                 if (page !== 'pricePaidData') {
    //                     // Disabling outcode search when the input request is coming from pricePaidData page. Reason: Outcode search would result in large amount of data   
    //                     params.set('type', 'postcode');
    //                 }
    //             } else {
    //                 params.delete('query');
    //                 params.delete('type');

    //             }
    //             replace(`${pathname}?${params.toString()}`);
    //         }
    //     }
    // }

    const handleSearch = async (term: string) => {
        const params = new URLSearchParams(searchParams);

        if (type === 'postcode') {
            const response = await fetch(`https://api.postcodes.io/postcodes/${term}/validate`);
            const data = await response.json();
            if (data.result === false) {
                setPostcodeError(true);
                return;
            }
            if (term) {
                params.set('query', term);
                params.set('type', 'postcode');
                replace(`${pathname}?${params.toString()}`);
            }

        }
        else if (type === 'area') {
            const response = await fetch(`https://api.postcodes.io/outcodes/${term}`);
            const data = await response.json();
            if (data.status !== 200) {
                setPostcodeError(true);
                return;
            }
            if (term) {
                params.set('query', term);
                params.set('type', 'area');
                replace(`${pathname}?${params.toString()}`);
            }
        }
        else {
            //todo: throw error show that it redirects to a generic error page
        }
    }

    const fetchPostCodesData = useDebouncedCallback((term) => {
        type === 'postcode' ?
            fetch(`https://api.postcodes.io/postcodes/${term}/autocomplete`)
                .then((response) => response.json())
                .then((data) => {
                    setAc(data.result);
                })
            :

            fetch(`https://api.postcodes.io/outcodes/${term}/nearest`)
                .then((response) => response.json())
                .then((data) => {
                    const result = data.result.map((e: { outcode: any; }) => e.outcode);
                    setAc(result);
                });
    }, 400);

    //fetch postcodes api and set error if the response is not 200


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
                size='md'
                id="search"
                label={type === 'postcode' ? "Search Postcode.." : "Search Postcode Area.."}
                placeholder="Start typing..."
                limit={10}
                onChange={(term) => handleChange(term)}
                data={ac}
                onOptionSubmit={(option) => { handleSearch(option) }}
                defaultValue={searchParams.get('query')?.toString()}
                error={postcodeError ? 'Invalid Postcode' : false}

            />
            {/* <Button
                    autoContrast
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    size='sm'
                    radius={5}
                    mt={10}
                    onClick={() => { handleSearch(postcodeInput) }}
                >
                    Submit
                </Button> */}
        </Flex>


    );
}