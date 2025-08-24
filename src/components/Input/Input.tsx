import React from 'react';
import { Typography } from '../Typography/Typography.tsx';

type Props = {
  value?: string;
  setValue?: (value: string) => void;
  label: string;
  name: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
  const { name, value, setValue, label, ...restProps } = props;

  function onInput(event: React.ChangeEvent) {
    const { value } = event.target as HTMLInputElement;

    if (setValue) {
      setValue(value);
    }
  }

  return (
    <div className={'flex flex-col gap-1 relative'}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        id={name}
        value={value}
        onChange={onInput}
        className={
          'min-h-10 bg-white border border-gray-300 rounded outline-none ' +
          'hover:border-gray-400 focus-visible:border-gray-900 px-4 p-y2 ' +
          'dark:bg-neutral-800 dark:border-gray-800 dark:focus-visible:bg-neutral-950 dark:focus-visible:border-pink-400'
        }
        {...restProps}
      />
      {props.errorMessage ? (
        <Typography
          variant={'s'}
          className={'absolute -bottom-5 text-red-500 left-0'}
        >
          {props.errorMessage}
        </Typography>
      ) : null}
    </div>
  );
}
