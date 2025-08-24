import { type SubmitHandler, useForm } from 'react-hook-form';
import { type FormModel, type FormSchema, Schema } from '../schema.ts';
import { Button } from '../../components/Button/Button.tsx';
import { Input } from '../../components/Input/Input.tsx';
import { Checkbox } from '../../components/Checkbox.tsx';
import { ImageUpload } from '../../components/ImageUpload.tsx';
import { Modal } from '../../components/Modal.tsx';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  onSubmit: (data: FormModel) => void;
  show: boolean;
  close: () => void;
};

export function HookForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormSchema, unknown, FormModel>({
    resolver: zodResolver(Schema),
    mode: 'all',
  });

  const isFormDisabled = !isValid;

  const onSubmit: SubmitHandler<FormModel> = (data) => {
    props.onSubmit(data);
  };

  const onClose = () => {
    reset();
    props.close();
  };

  return (
    <Modal
      footerButtons={
        <Button disabled={isFormDisabled} type={'submit'}>
          Save
        </Button>
      }
      show={props.show}
      close={onClose}
      title={'React hook form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register('name')}
        errorMessage={errors.name?.message}
        label={'Name'}
      />
      <Input
        {...register('age')}
        type={'number'}
        errorMessage={errors.age?.message}
        label={'Age'}
      />
      <Input
        errorMessage={errors.email?.message}
        {...register('email')}
        label={'Email'}
      />
      <Input
        errorMessage={errors.password?.message}
        {...register('password')}
        label={'Password'}
      />
      <Input
        errorMessage={errors.confirmPassword?.message}
        {...register('confirmPassword')}
        label={'Confirm password'}
      />
      <Checkbox {...register('male')} label={'male'} />
      <Checkbox
        {...register('acceptTerms')}
        label={'Accept Terms and Conditions agreement'}
      />
      <ImageUpload
        errorMessage={errors.image?.message}
        label={'Upload image'}
        {...register('image', {
          onChange: (e) => {
            return e.target.files[0];
          },
        })}
      />
    </Modal>
  );
}
