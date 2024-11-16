import { ChangeEvent, SetStateAction, useState } from 'react';

export type BaseInputTypes = 'text' | 'password';

export interface BaseInputProps {
  id?: string;
  name: string;
  type: BaseInputTypes;
  className: string;
  readonly?: boolean;
  onChange?: (event?: ChangeEvent<HTMLInputElement>) => void;
  labelValue?: string;
  labelClass?: string;
  placeholder?: string;
  value?: string;
  setValue?: React.Dispatch<SetStateAction<string>>;
}

const BaseInput = ({
  id,
  name,
  onChange,
  type,
  readonly,
  className,
  labelValue,
  labelClass,
  placeholder,
  value,
  setValue,
}: BaseInputProps) => {
  const [baseValue, setBaseValue] = useState('');

  return (
    <>
      {labelValue && (
        <label className={labelClass} htmlFor={id}>
          {labelValue}
        </label>
      )}
      <input
        id={id}
        value={value ?? baseValue}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        onChange={event => {
          if (setValue) {
            setValue(event.target.value);
          } else {
            setBaseValue(event.target.value);
          }

          if (onChange) {
            onChange();
          }
        }}
        readOnly={readonly ?? false}
      />
    </>
  );
};

export default BaseInput;
