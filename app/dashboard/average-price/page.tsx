

import { AvgPricePostcodeInput } from "../../../components/AvgPricePostcodeInput";
import classes from '../../../css/Layout.module.css';
import { PriceDataByPropertyType } from "../../../lib/definitions";
import { fetchRealData, fetchSampleData } from "../../../lib/postgres-data";
import { Alert, Center, Space, rem } from "@mantine/core";
import AvgPriceOutput from "../../../components/AvgPriceOutput";
import { IconAlertCircleFilled } from '@tabler/icons-react';
import Image from "next/image";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        t?: boolean;
        s?: boolean;
        d?: boolean;
        f?: boolean;
    };
}) {
    const query = searchParams?.query || '';
    let data: PriceDataByPropertyType[] = [];

    if (query) {
        //use an environment variable to determine which data to fetch
        if (process.env.USE_SAMPLE_DATA == 'true') {
            console.debug('Using sample data');
            data = await fetchSampleData(query);
        } else {
            console.debug('Using real data');
            data = await fetchRealData(query);
        }
    }
    const icon = <Image src='/sad.png' alt='Terraced' width={20} height={20} />

    return (
        <>
            <div className={classes.content}>
                <AvgPricePostcodeInput />

            </div>
            <Space h={rem(40)} />

            {data.length != 0 && (
                <div className={classes.content}>
                    <AvgPriceOutput data={data} />
                </div>
            )}

            {data.length <= 0 && (

                <div>
                    <Center>
                        <Alert style={{ width: rem(400), height: rem(120) }} variant="outline" color="yellow" title="No Price Paid data" icon={icon}>
                            There is no data present for the postcode you entered. Please try another postcode.
                        </Alert>
                    </Center>
                </div>
            )}

        </>
    );
}