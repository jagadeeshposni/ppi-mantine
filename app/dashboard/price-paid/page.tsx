
import { Space, rem } from "@mantine/core";
import { Suspense } from "react";
import PostCodeInput from '../../../components/PostCodeInput';
import PricePaidOutput from "../../../components/PricePaidOutput";
import AvgPriceOutputSkeleton from "../../../components/skeleton/AvgPriceOutpuSkeleton";

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
            <PostCodeInput page='pricePaidData'/>
            <Space h={rem(40)} />
            <Suspense key={query} fallback={<AvgPriceOutputSkeleton />} >
                <PricePaidOutput query={query} />
            </Suspense>

        </>
    );
}