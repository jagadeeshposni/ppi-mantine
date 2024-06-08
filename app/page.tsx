// 'use client';
import { Image, Container, Title, Button, Group, Text, List, ListItem, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '../public/image.svg';
import classes from '../css/HeroBullets.module.css';

export default function HomePage() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Property <span className={classes.highlight}>trends</span> in  United Kingdom <br />
          </Title>
          <Text c="dimmed" mt="md">
            See some interesting stats of how property trends have changed in the UK – Data from HM Land Registry
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <ListItem>
              <b>National Stats</b> – Some interesting stats about property trends in the UK
            </ListItem>
            <ListItem>
              <b>Average Price trends by Postcode</b> – Find property trends by postcode
            </ListItem>
            <ListItem>
              <b>Property Price paid data</b> – Find out how much properties have been sold for
            </ListItem>
          </List>

          <Group mt={30}>
            <a href="/dashboard" className={classes.control}>
              <Button radius="xl" size="md" className={classes.control}>
                Go to Dashboard
              </Button>
            </a>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
    </Container>
  );
}
