'use client'
import { PricePaidDataByPostCode } from '../lib/definitions';
import { Table } from '@mantine/core';


export default function PricePaidChart({
    data,
}: {
    data: PricePaidDataByPostCode[];
}) {

  const rows = data.map((element) => (
    // const address = ;

    <Table.Tr >
      <Table.Td>{element.transfer_date}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>{
          element.property_type === 'T' ? 'Terraced' : 
            element.property_type === 'S' ? 'Semi-Detached' :
              element.property_type === 'D' ? 'Detached' :
                element.property_type === 'F' ? 'Flats' : 'Other'
               }
      </Table.Td>
      <Table.Td>{(element.soan + ' ' + element.paon + ' ' + element.street + ' ' ).replace(/ +/g, ' ')}</Table.Td>
      <Table.Td>{element.city}</Table.Td>
      <Table.Td>{element.county}</Table.Td>
      <Table.Td>{element.age}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
    { rows.length > 0 && (

    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date Sold</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Property Type</Table.Th>
          <Table.Th>Address </Table.Th>
          <Table.Th>city</Table.Th>
          <Table.Th>county</Table.Th>
          <Table.Th>age</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    )}
    </>
  );
}