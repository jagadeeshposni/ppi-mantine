'use client'
import { AreaChart } from '@mantine/charts';
import { Box, Center, SegmentedControl, Space, rem } from '@mantine/core';
import Image from "next/image";
import { useState } from 'react';
import { PriceDataByPropertyType } from '../lib/definitions';


export default function ChartWithSelectors({
    data,
}: {
    data: PriceDataByPropertyType[];
}) {
    const [value, setValue] = useState('all');

    interface SeriesItem {
        name: string;
        color: string;
        label: string;
    }

    interface SeriesMap {
        [key: string]: SeriesItem[];
    }

    const seriesMap: SeriesMap = {
        all: [
            { name: 'semi_detached_houses_average_price', color: 'blue.6', label: 'Semi-Detached Houses' },
            { name: 'terraced', color: 'yellow.6', label: 'Terraced Houses' },
            { name: 'detached_houses_average_price', color: 'red.6', label: 'Detached Houses' },
            { name: 'flats_average_price', color: 'grape.6', label: 'Flats' }
        ],
        t: [{ name: 'terraced', color: 'yellow.6', label: 'Terraced Houses' }],
        s: [{ name: 'semi_detached_houses_average_price', color: 'blue.6', label: 'Semi-Detached Houses' }],
        d: [{ name: 'detached_houses_average_price', color: 'red.6', label: 'Detached Houses' }],
        f: [{ name: 'flats_average_price', color: 'grape.6', label: 'Flats' }]
    };

    const series = seriesMap[value];

    return (

        data.length !== 0 && (
            <>
                <Center style={{ gap: 10 }}>
                    <SegmentedControl
                        // fullWidth
                        size='sm'
                        radius='md'
                        color='teal'
                        transitionDuration={500}
                        transitionTimingFunction="linear"
                        value={value}
                        onChange={setValue}
                        data={[
                            {
                                value: 'all',
                                label: (
                                    <Center style={{ gap: 10, padding: 5 }}>
                                        <Image src='/house.png' alt='Terraced' width={30} height={30} />
                                        <Box visibleFrom='sm'> All Types </Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 't',
                                label: (
                                    <Center style={{ gap: 10, padding: 5 }}>
                                        <Image src='/terraced-house.png' alt='Terraced' width={30} height={30} />
                                        <Box visibleFrom='sm'> Terraced  </Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 's',
                                label: (
                                    <Center style={{ gap: 10, padding: 5 }}>
                                        <Image src='/semi-detached.png' alt='Terraced' width={30} height={30} />
                                        <Box visibleFrom='sm'> Semi Detached  </Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 'd',
                                label: (
                                    <Center style={{ gap: 10, padding: 5 }}>
                                        <Image src='/detached.png' alt='Terraced' width={30} height={30} />
                                        <Box visibleFrom='sm'> Detached  </Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 'f',
                                label: (
                                    <Center style={{ gap: 10, padding: 5 }}>
                                        <Image src='/flats.png' alt='Terraced' width={30} height={30} />
                                        <Box visibleFrom='sm'>Flats</Box>
                                    </Center>
                                ),
                            },
                        ]}
                    />
                </Center>
                <Space h={rem(40)} />

                <AreaChart
                    h={500}
                    data={data}
                    dataKey="transfer_date"
                    series={series}
                    curveType="monotone"
                    withLegend
                    connectNulls
                    tooltipAnimationDuration={200}

                />
            </>
        ));

}