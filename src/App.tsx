import { Button } from './components/Button/Button.tsx';
import { useState } from 'react';
import { Form } from './modules/Form/Form.tsx';
import { HookForm } from './modules/HookForm/HookForm.tsx';
import { useAppDispatch } from './store/hooks/useAppDispatch.ts';
import type { FormModel } from './modules/schema.ts';
import { dataListSlice } from './modules/DataList/datalist.slice.ts';
import { DataList } from './modules/DataList/DataList.tsx';

export function App() {
  const [formModal, setFormModal] = useState<'hook' | 'simple' | null>(null);

  const dispatch = useAppDispatch();

  const closeModal = () => {
    setFormModal(null);
  };

  const onSubmitForm = (data: FormModel) => {
    dispatch(dataListSlice.actions.addData(data));
    closeModal();
  };

  return (
    <div className={'flex flex-col p-2 gap-4'}>
      <div className={'flex gap-2'}>
        <Button onClick={() => setFormModal('simple')}>
          Uncontrolled form
        </Button>
        <Button onClick={() => setFormModal('hook')}>React hook form</Button>
      </div>
      <DataList />
      <Form
        show={formModal === 'simple'}
        close={closeModal}
        onSubmit={onSubmitForm}
      />
      <HookForm
        show={formModal === 'hook'}
        close={closeModal}
        onSubmit={onSubmitForm}
      />
    </div>
  );
}
