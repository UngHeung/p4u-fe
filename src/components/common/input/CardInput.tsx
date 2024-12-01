import BaseInput, { BaseInputProps } from './BaseInput';

interface CardInputProps extends Partial<BaseInputProps> {
  name: string;
}

const CardInput = ({
  id,
  name,
  className,
  onChange,
  readOnly,
  placeholder,
  value,
  setValue,
}: CardInputProps) => {
  return (
    <BaseInput
      id={id}
      type={'text'}
      name={name}
      className={className ?? ''}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      value={value}
      setValue={setValue}
    />
  );
};

export default CardInput;
