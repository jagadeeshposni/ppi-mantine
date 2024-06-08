import { Text } from "@mantine/core";
import Image from "next/image";
import { Flex, Button } from '@mantine/core';

export default function PropertyTrendsLogo() {
    return (
        <div className="items-center">

            <Flex
                mih={50}
                gap="sm"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <Image
                    src="/property.png"
                    width={40}
                    height={40}
                    className="hidden md:block"
                    alt="logo of Property Trends"
                />
                <Text>Property Trends</Text>
            </Flex>
        </div>
    );
}
