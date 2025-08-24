import React, { useCallback } from 'react';

type Props<ListItem> = {
  list: ListItem[];
  renderItem: (item: ListItem) => React.ReactNode;
  itemKey: keyof ListItem;
};

export function VerticalList<ListItem>(props: Props<ListItem>) {
  const renderItem = useCallback(
    (item: ListItem) => {
      return (
        <li key={item[props.itemKey] as string} className={'max-w-7xl'}>
          {props.renderItem(item)}
        </li>
      );
    },
    [props.list, props.renderItem]
  );

  if (!props.list.length) {
    return (
      <div
        className={
          'max-w-7xl bg-neutral-300 w-full p-4 m-auto flex flex-col gap-4 min-h-72 rounded-md items-center justify-center dark:bg-neutral-800'
        }
      >
        <p>No entered data(</p>
        <p>Create by clicking on buttons</p>
      </div>
    );
  }

  return (
    <ul className={'flex h-full flex-wrap gap-3 items-stretch flex-col'}>
      {props.list.map(renderItem)}
    </ul>
  );
}
