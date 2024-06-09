'use client';
import { UnstyledButton, Checkbox, Text, SimpleGrid } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
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
        tabIndex={-1}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}




const mockdata = [
  { param: 't', title: 'Terraced', image: '/terraced-house.png' },
  { param: 's', title: 'Semi Detached', image: '/semi-detached.png' },
  { param: 'd', title: 'Detached', image: '/detached.png' },
  { param: 'f', title: 'Flats', image: '/flats.png' },
];

export function ImageCheckboxes() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChekboxChange = (checked: boolean, param: string) => {
    console.log(checked, param);
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set(param, 'true');
    } else {
      params.delete(param);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const items = mockdata.map((item) =>
    <ImageCheckbox
      {...item}
      key={item.title}
      onChange={(checked: boolean) => handleChekboxChange(checked, item.param)}
    />);
  return <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>{items}</SimpleGrid>;
}