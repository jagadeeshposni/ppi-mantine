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



    console.log('page', page);

    const handleSearch = async (term: string) => {
        const params = new URLSearchParams(searchParams);
        //check if the term is a postcode or area
        const type = term.match(/^[A-Z]{1,2}[0-9]{1,2}[A-Z]? [0-9][A-Z]{2}$/) ? 'postcode' : 'area';

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
            fetch(`https://api.postcodes.io/postcodes/${term}/autocomplete`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.result === null) {
                        setPostcodeError(true);
                    } else {
                        let acResult = data.result;
                        //take first element and extract outcode
                        const outcode = acResult[0].split(' ')[0];
                        acResult.unshift(outcode);
                        // alert(acResult);
                        setAc(acResult);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching postcode autocomplete data:", error);
                    setPostcodeError(true);
                });


            // fetch(`https://api.postcodes.io/outcodes/${term}/nearest`)
            //     .then((response) => response.json())
            //     .then((data) => {
            //         if (data.status !== 200) {
            //             setPostcodeError(true);
            //         } else {
            //             const result = data.result.map((e: { outcode: any; }) => e.outcode);
            //             setAc(result);
            //         }
            //     });
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
                label={"Search Postcode/Area"}
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