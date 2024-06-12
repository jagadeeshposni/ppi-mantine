import { AreaChart } from '@mantine/charts';
import { PriceDataByPropertyType } from '../lib/definitions';

export default function PricesChart
  ({
    data,
    s,
    t,
    d,
    f
  }: {
    data: PriceDataByPropertyType[];
    s: boolean;
    t: boolean;
    d: boolean;
    f: boolean;
  }) {


  const series = [];
  if(s){
    series.push({ name: 'semi_detached_houses_average_price', color: 'blue.6' });
  }
  if(t){
    series.push({ name: 'terraced', color: 'yellow.6' });
  }
  if(d){
    series.push({ name: 'detached_houses_average_price', color: 'red.6' });
  }
  if(f){
    series.push({ name: 'flats_average_price', color: 'grape.6' });
  } 

  return (
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
  );
}

