'use client'
import { useState } from 'react';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    keys,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './PricePaidTable.module.css';
interface RowData {
    transfer_date: string;
    price: number;
    property_type: string;
    soan: string;
    paon: string;
    street: string;
    city: string;
    county: string;
    age: string;

}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query))
    );
}

function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return String(b[sortBy]).localeCompare(String(a[sortBy]));
            }

            return String(a[sortBy]).localeCompare(String(b[sortBy]));
        }),
        payload.search
    );
}

export default function PricePaidTable({
    data,
}: {
    data: RowData[];
}) {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <Table.Tr key='price_paid' >
            <Table.Td>{row.transfer_date}</Table.Td>
            <Table.Td>{row.price}</Table.Td>
            <Table.Td>{
                row.property_type === 'T' ? 'Terraced' :
                    row.property_type === 'S' ? 'Semi-Detached' :
                        row.property_type === 'D' ? 'Detached' :
                            row.property_type === 'F' ? 'Flats' : 'Other'
            }
            </Table.Td>
            <Table.Td>{(row.soan + ' ' + row.paon + ' ' + row.street + ' ').replace(/ +/g, ' ')}</Table.Td>
            <Table.Td>{row.city}</Table.Td>
            <Table.Td>{row.county}</Table.Td>
            <Table.Td>{row.age}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                    <Table.Tr>

                        <Th
                            sorted={sortBy === 'transfer_date'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('transfer_date')}
                        >Date Sold</Th>
                        <Th
                            sorted={sortBy === 'price'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('price')}
                        >Price</Th>
                        <Th
                            sorted={sortBy === 'property_type'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('property_type')}
                        >Property Type</Th>
                        <Th
                            sorted={sortBy === 'soan'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('soan')}
                        >Address </Th>
                        <Th
                            sorted={sortBy === 'city'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('city')}
                        >city</Th>
                        <Th
                            sorted={sortBy === 'county'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('county')}
                        >county</Th>
                        <Th
                            sorted={sortBy === 'age'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('age')}
                        >age</Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={7} >
                                <Text fw={500} ta="center">
                                    Nothing found
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}