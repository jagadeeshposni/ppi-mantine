

import { FloatingLabelInput } from "../../../components/FloatingLabelInput";
import { ImageCheckboxes } from "../../../components/ImageCheckboxes";
import classes from '../../../css/Layout.module.css';
import PricesChart from "../../../components/PricesChart";
import { PriceDataByPropertyType } from "../../../lib/definitions";
import { fetchRealData, fetchSampleData } from "../../../lib/postgres-data";
import { Button } from "@mantine/core";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
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
    return (
        <>
            <div className={classes.content}>
                <FloatingLabelInput />
                
            </div>
            <div className={classes.content}>
                <ImageCheckboxes />
            </div>
            <div className={classes.content}>
                <PricesChart data={data} />
            </div>
        </>
    );
}