import { Typography } from './Typography/Typography.tsx';

type Props = {
  label: string;
  name: string;
  errorMessage?: string;
};

export const ImageUpload = (props: Props) => {
  const { name, label, errorMessage, ...restProps } = props;

  return (
    <div className={'relative'}>
      <div className={'flex gap-2 items-center'}>
        <input {...restProps} name={name} id={name} type="file" />
        <label htmlFor={name}>{label}</label>
      </div>
      {errorMessage ? (
        <Typography
          variant={'s'}
          className={'absolute -bottom-5 text-red-500 left-0'}
        >
          {errorMessage}
        </Typography>
      ) : null}
    </div>
  );
};
