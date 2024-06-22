import { Alert, Center, rem } from '@mantine/core';
import Image from 'next/image';
import { Suspense } from 'react';
import { PricePaidDataByPostCode } from '../lib/definitions';
import { fetchPricePaidDataForPostcode } from '../lib/postgres-data';
import AvgPriceOutputSkeleton from './skeleton/AvgPriceOutpuSkeleton';
import PricePaidTable from './table-with-search-sort/PricePiadTable';

export default async function PricePaidOutput
  ({
    query,
  }: {
    query: string;
  }) {
  let data: PricePaidDataByPostCode[] = [];
  if (query) {
    //use an environment variable to determine which data to fetch
    console.debug('Fetching price paid data from postgres');
    data = await fetchPricePaidDataForPostcode(query);
  }
  const icon = <Image src='/sad.png' alt='Terraced' width={20} height={20} />

  return (
    <>
      <Suspense fallback={<AvgPriceOutputSkeleton />} >
        <PricePaidTable data={data} />
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

