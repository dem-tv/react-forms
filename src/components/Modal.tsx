import * as React from 'react';
import { type FormEvent, useRef } from 'react';
import { Icon } from './Icon.tsx';

type Props = {
  close: () => void;
  children?: React.ReactNode;
  show?: boolean;
  title?: string;
  footerButtons?: React.ReactNode;
  onSubmit?: (e: FormEvent) => void;
};

export const Modal = (props: Props) => {
  const clickedElement = useRef<Element>(null);

  function onClickContent(e: React.MouseEvent) {
    e.stopPropagation();
  }

  function onMousedownContent(e: React.MouseEvent) {
    clickedElement.current = e.currentTarget;
  }

  function closeModal() {
    if (clickedElement.current) {
      clickedElement.current = null;
      return;
    }

    props.close();
  }

  if (!props.show) {
    return null;
  }

  return (
    <div
      onClick={closeModal}
      className={
        'backdrop-blur overflow-auto h-full w-full flex items-start p-16 justify-center fixed inset-0'
      }
    >
      <form
        onSubmit={props.onSubmit}
        onClick={onClickContent}
        onMouseDown={onMousedownContent}
        className={
          'border bg-neutral-100 max-w-2xl w-full rounded p-4 shadow-2xl flex flex-col gap-6 relative'
        }
      >
        <button
          type={'button'}
          onClick={props.close}
          className={'absolute right-2 top-2'}
        >
          <Icon name={'close'} />
        </button>
        {props.title ? (
          <h3 className={'text-xl font-bold'}>{props.title}</h3>
        ) : null}
        <div className={'flex flex-col gap-5'}>{props.children}</div>
        {props.footerButtons && (
          <div className={'w-full flex justify-stretch mt-2.5'}>
            {props.footerButtons}
          </div>
        )}
      </form>
    </div>
  );
};
