'use client'
import { AreaChart } from '@mantine/charts';
import { PriceDataByPropertyType } from '../lib/definitions';
import classes from '../css/Layout.module.css';
import { Box, Center, SegmentedControl, Space, rem } from '@mantine/core';
import Image from "next/image";
import { Suspense, useState } from 'react';
import AvgPriceOutputSkeleton from './skeleton/AvgPriceOutpuSkeleton';


export default function ChartWithSelectors({
    data,
}: {
    data: PriceDataByPropertyType[];
}) {
    const [value, setValue] = useState('all');

    let series = [];
    if (value == 'all') {
        series = [];
        series.push({ name: 'semi_detached_houses_average_price', color: 'blue.6' });
        series.push({ name: 'terraced', color: 'yellow.6' });
        series.push({ name: 'detached_houses_average_price', color: 'red.6' });
        series.push({ name: 'flats_average_price', color: 'grape.6' });
    } else if (value == 't') {
        series = [];
        series.push({ name: 'terraced', color: 'yellow.6' });
    }
    else if (value == 's') {
        series = [];
        series.push({ name: 'semi_detached_houses_average_price', color: 'blue.6' });
    }
    else if (value == 'd') {
        series = [];
        series.push({ name: 'detached_houses_average_price', color: 'red.6' });
    }
    else if (value == 'f') {
        series = [];
        series.push({ name: 'flats_average_price', color: 'grape.6' });
    }

    return (

        data.length !== 0 && (
            <>
                <SegmentedControl
                    fullWidth
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
                                <Center style={{ gap: 10 }}>
                                    <Image src='/terraced-house.png' alt='Terraced' width={30} height={30} />
                                    <Box visibleFrom='sm'> All  </Box>
                                </Center>
                            ),
                        },
                        {
                            value: 't',
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <Image src='/terraced-house.png' alt='Terraced' width={30} height={30} />
                                    <Box visibleFrom='sm'> Terraced  </Box>
                                </Center>
                            ),
                        },
                        {
                            value: 's',
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <Image src='/semi-detached.png' alt='Terraced' width={30} height={30} />
                                    <Box visibleFrom='sm'> Semi Detached  </Box>
                                </Center>
                            ),
                        },
                        {
                            value: 'd',
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <Image src='/detached.png' alt='Terraced' width={30} height={30} />
                                    <Box visibleFrom='sm'> Detached  </Box>
                                </Center>
                            ),
                        },
                        {
                            value: 'f',
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <Image src='/flats.png' alt='Terraced' width={30} height={30} />
                                    <Box visibleFrom='sm'>Flats</Box>
                                </Center>
                            ),
                        },
                    ]}
                />
                <Space h={rem(40)} />

                <div className={classes.content}>
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
                </div>
            </>
        ));

}