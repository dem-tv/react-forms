type Props = {
  label: string;
  name: string;
};

export const Checkbox = (props: Props) => {
  return (
    <div className={'flex gap-2 items-center'}>
      <input name={props.name} id={props.name} type="checkbox" />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
};
