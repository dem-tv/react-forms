import { Input } from '../../components/Input/Input.tsx';
import { Checkbox } from '../../components/Checkbox.tsx';
import { ImageUpload } from '../../components/ImageUpload.tsx';
import { Modal } from '../../components/Modal.tsx';
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button.tsx';
import { type FormModel, Schema } from '../schema.ts';

type Props = {
  onSubmit: (data: FormModel) => void;
  show: boolean;
  close: () => void;
};

export function Form(props: Props) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormModel, string>>
  >({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const formModel = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [key]: value instanceof File ? [value] : value,
        };
      },
      {}
    );

    const parseResult = await Schema.safeParseAsync(formModel);

    if (!parseResult.error) {
      setErrors({});
      props.onSubmit(parseResult.data);
      return;
    }

    const newErrors = parseResult.error.issues.reduce(
      (acc, f) => ({
        ...acc,
        [f.path[0]]: f.message,
      }),
      {}
    );

    setErrors(newErrors);
  }

  const onClose = () => {
    setErrors({});
    props.close();
  };

  return (
    <Modal
      footerButtons={<Button type={'submit'}>Save</Button>}
      show={props.show}
      close={onClose}
      title={'Uncontrolled form'}
      onSubmit={onSubmit}
    >
      <Input errorMessage={errors.name} name={'name'} label={'Name'} />
      <Input
        type={'number'}
        errorMessage={errors.age}
        name={'age'}
        label={'Age'}
      />
      <Input errorMessage={errors.email} name={'email'} label={'Email'} />
      <Input
        errorMessage={errors.password}
        name={'password'}
        label={'Password'}
      />
      <Input
        errorMessage={errors.confirmPassword}
        name={'confirmPassword'}
        label={'Confirm password'}
      />
      <Checkbox name={'male'} label={'male'} />
      <Checkbox
        name={'acceptTerms'}
        label={'Accept Terms and Conditions agreement'}
      />
      <ImageUpload
        errorMessage={errors.image}
        name={'image'}
        label={'Upload image'}
      />
    </Modal>
  );
}
