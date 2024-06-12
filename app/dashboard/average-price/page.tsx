

import { AvgPricePostcodeInput } from "../../../components/AvgPricePostcodeInput";
import { ImageCheckboxes } from "../../../components/ImageCheckboxes";
import classes from '../../../css/Layout.module.css';
import PricesChart from "../../../components/PricesChart";
import { PriceDataByPropertyType } from "../../../lib/definitions";
import { fetchRealData, fetchSampleData } from "../../../lib/postgres-data";

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
    return (
        <>
            <div className={classes.content}>
                <AvgPricePostcodeInput />

            </div>

            <div className={classes.content}>
                <ImageCheckboxes />
            </div>

            {data.length != 0 && (
                <div className={classes.content}>
                    <PricesChart data={data}
                        s={searchParams?.s || false}
                        t={searchParams?.t || false}
                        d={searchParams?.d || false}
                        f={searchParams?.f || false}
                    />
                </div>
            )}

        </>
    );
}