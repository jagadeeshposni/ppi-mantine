import { Burger, Container } from "@mantine/core";
import PropertyTrendsLogo from "./property-trends-logo";
import { useDisclosure } from "@mantine/hooks";

export default function MobileHeader() {
    // const [opened, { toggle }] = useDisclosure(false);
    return (
        <header className="flex">
            <Container >
                <PropertyTrendsLogo />
                <Burger
                    // opened={opened}
                    // onClick={toggle}
                    size="sm"
                    hiddenFrom="sm"
                />
            </Container>
        </header>
    );
}