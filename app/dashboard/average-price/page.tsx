
import { Space, rem } from "@mantine/core";
import { Suspense } from "react";
import AvgPriceOutput from "../../../components/AvgPriceOutput";
import PostCodeInput from '../../../components/PostCodeInput';
import AvgPriceOutputSkeleton from "../../../components/skeleton/AvgPriceOutpuSkeleton";

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
            <PostCodeInput page="avgPrice"/>
            <Space h={rem(40)} />
            <Suspense key={query + type} fallback={<AvgPriceOutputSkeleton />} >
                <AvgPriceOutput query={query} type={type} />
            </Suspense>

        </>
    );
}