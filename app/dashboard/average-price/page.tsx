
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
    };
}) {

    const query = searchParams?.query || '';

    return (
        <>
            <AvgPricePostcodeInput />
            <Space h={rem(40)} />
            <div className={classes.content}>
                <Suspense key={query} fallback={<AvgPriceOutputSkeleton />} >
                    <AvgPriceOutput query={query} />
                </Suspense>
            </div>

        </>
    );
}