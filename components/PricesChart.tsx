import { AreaChart } from '@mantine/charts';
import { PriceDataByPropertyType } from '../lib/definitions';

export default function PricesChart
  ({
    data,
  }: {
    data: PriceDataByPropertyType[];
  }) {
    console.log(data);
  return (
    <AreaChart
      h={500}
      data={data}
      dataKey="transfer_date"
      series={[
        { name: 'terraced', color: 'yellow.6' },
        { name: 'semi_detached_houses_average_price', color: 'blue.6' },
        { name: 'detached_houses_average_price', color: 'indigo.6' },
        { name: 'flats_average_price', color: 'grape.6' },
      ]}
      curveType="monotone"
      withLegend
      connectNulls
      tooltipAnimationDuration={200}
    />
  );
}

