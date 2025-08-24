import { describe, expect, it, vi } from 'vitest';
import { render, getByRole, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { VerticalList } from './VerticalList.tsx';

type ListItem = {
  text: string;
};

const props = {
  pagination: 'pagination component',
  list: [
    {
      text: 'text1',
    },
    {
      text: 'text2',
    },
    {
      text: 'text3',
    },
    {
      text: 'text4',
    },
  ],
  renderItem: (item: ListItem) => item.text,
  loading: false,
  itemKey: 'text' as const,
};

describe('VerticalList', () => {
  it('Renders PageList', () => {
    const container = render(<VerticalList {...props} />).container;

    expect(container).toBeInTheDocument();
  });

  it('Renders list of passed items', () => {
    const spy = vi.spyOn(props, 'renderItem');
    const container = render(<VerticalList {...props} />).container;
    const list = getByRole(container, 'list');

    expect(list.children.length).toBe(4);
    expect(spy).toBeCalledTimes(4);
  });

  it('Renders placeholder block when items list is empty', () => {
    const container = render(<VerticalList {...props} list={[]} />).container;

    const placeholder = getByText(container, 'No results :(') as HTMLElement;

    expect(placeholder).toBeInTheDocument();
  });
});
