import React from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  new?: boolean;
};

export const Card = (props: Props) => {
  const cn = clsx({
    'border rounded w-full max-w-96 px-6 py-4': true,
    'bg-green-100': props.new,
  });

  return <div className={cn}>{props.children}</div>;
};
