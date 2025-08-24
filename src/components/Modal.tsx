import * as React from 'react';
import { type FormEvent, useEffect, useRef } from 'react';
import { Icon } from './Icon.tsx';
import { FocusTrap } from 'focus-trap-react';
import { createPortal } from 'react-dom';

type Props = {
  close: () => void;
  children?: React.ReactNode;
  show?: boolean;
  title?: string;
  footerButtons?: React.ReactNode;
  onSubmit?: (e: FormEvent) => void;
};

const getModalRoot = () => {
  const root = document.getElementById('modals');

  if (!root) {
    throw new Error('Modals root is not defined');
  }

  return root;
};

export const Modal = (props: Props) => {
  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    if (!props.show) {
      document.removeEventListener('keyup', onKeyUp);
    }
    return () => document.removeEventListener('keyup', onKeyUp);
  }, [props.show]);
  const clickedElement = useRef<Element>(null);

  function onKeyUp(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      props.close();
    }
  }

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

  const renderModal = () => {
    return (
      <FocusTrap>
        <dialog
          open
          onClick={closeModal}
          className={
            'bg-transparent backdrop-blur overflow-auto h-full w-full flex items-start p-16 justify-center fixed inset-0'
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
        </dialog>
      </FocusTrap>
    );
  };

  return createPortal(renderModal(), getModalRoot());
};
