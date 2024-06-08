'use client';
import { UnstyledButton, Checkbox, Text, SimpleGrid } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
// import icons from './icons';
import classes from '../css/ImageCheckboxes.module.css';
import Image from "next/image";

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  image: string;
}

export function ImageCheckbox({
  checked,
  defaultChecked,
  onChange,
  title,
  className,
  image,
  ...others
}: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      data-checked={value || undefined}
      className={classes.button}
    >
      <Image src={image} alt={title} width={30} height={30} />

      <div className={classes.body}>
        <Text fw={500} size="sm" lh={1}>
          {title}
        </Text>
      </div>

      <Checkbox
        checked={value}
        onChange={() => { }}
        tabIndex={-1}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}

const mockdata = [
  { title: 'Terraced', image: '/terraced-house.png' },
  { title: 'Semi Detached', image: '/semi-detached.png' },
  { title: 'Detached', image: '/detached.png' },
  { title: 'Flats', image: '/flats.png' },
];

export function ImageCheckboxes() {
  const items = mockdata.map((item) => <ImageCheckbox defaultChecked {...item} key={item.title} />);
  return <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>{items}</SimpleGrid>;
}