import { Center, Skeleton, Space, rem } from "@mantine/core";

export default function AvgPriceOutputSkeleton() {
    return (
        <>
            {/* <Skeleton height={50} circle mb="xl" /> */}
            <Space h={rem(5)} />
            {/* <Center>
                <Skeleton height={80} mt={60} width="25%" radius="sm" />
            </Center> */}

            <Skeleton height={40} radius="sm" />
            <Space h={rem(10)} />
            <Space h={rem(10)} />


            <Space h={rem(65)} />

            <Skeleton height={2} mt={6} className="right: 0" width="25%" radius="xl" />
            <Space h={rem(65)} />

            <Skeleton height={2} mt={6} radius="xl" />
            <Space h={rem(65)} />

            <Skeleton height={2} mt={6} radius="xl" />
            <Space h={rem(65)} />

            <Skeleton height={2} mt={6} radius="xl" />
            <Space h={rem(65)} />

            <Skeleton height={2} mt={6} radius="xl" />
            <Space h={rem(65)} />

            <Skeleton height={2} mt={6} radius="xl" />
            <Space h={rem(65)} />

        </>
    );
}