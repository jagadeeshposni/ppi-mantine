import { Alert, Center, rem } from '@mantine/core';
import { PriceDataByPropertyType } from '../lib/definitions';
import { fetchRealData, fetchSampleData } from '../lib/postgres-data';
import ChartWithSelectors from './ChartWithSelectors';
import Image from 'next/image';
import { Suspense } from 'react';
import AvgPriceOutputSkeleton from './skeleton/AvgPriceOutpuSkeleton';

export default async function AvgPriceOutput
  ({
    query,
  }: {
    query: string;
  }) {
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
      <Suspense fallback={<AvgPriceOutputSkeleton />} >

        <ChartWithSelectors data={data} />
      </Suspense>
      {query && data.length === 0 && (
        <div>
          <Center>
            <Alert style={{ width: rem(400), height: rem(120) }} variant="outline" color="yellow" title="No Price Paid data" icon={icon}>
              There is no data present for the postcode {query}. Please try another postcode.
            </Alert>
          </Center>
        </div>
      )}
    </>
  );
}

