
import classes from '../../../css/Layout.module.css';
import AvgPriceOutput from "../../../components/AvgPriceOutput";
import { Suspense } from "react";
import AvgPriceOutputSkeleton from "../../../components/skeleton/AvgPriceOutpuSkeleton";
import { Space, rem } from "@mantine/core";
import AvgPricePostcodeInput from '../../../components/AvgPricePostcodeInput';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        type?: string;
    };
}) {

    const query = searchParams?.query || '';
    const type = searchParams?.type || '';

    return (
        <>
            <AvgPricePostcodeInput />
            <Space h={rem(40)} />
            <div className={classes.content}>
                <Suspense key={query + type} fallback={<AvgPriceOutputSkeleton />} >
                    <AvgPriceOutput query={query} type={type}/>
                </Suspense>
            </div>

        </>
    );
}