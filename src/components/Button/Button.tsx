import React, { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
} & ButtonProps;

export function Button(props: Props) {
  const { children, className, disabled, ...restProps } = props;

  const cn = clsx(
    {
      ['bg-orange-400 hover:bg-orange-600 rounded' +
      ' whitespace-nowrap border hover:border-neutral-500 text-black  active:scale-90 flex items-center' +
      ' dark:bg-neutral-800 dark:border-pink-400 dark:hover:bg-neutral-900 dark:text-gray-300 px-2 py-1']:
        true,
      ['bg-orange-50 hover:bg-orange-50 cursor-default']: disabled,
    },
    className
  );
  const { type = 'button', ...buttonProps } = restProps;

  return (
    <button
      disabled={disabled}
      className={cn}
      type={type as ButtonProps['type']}
      {...(buttonProps as object)}
    >
      {children}
    </button>
  );
}
