import BaseInput, { BaseInputProps } from './BaseInput';
import style from './styles/auth-input.module.css';

interface AuthinputProps extends Partial<BaseInputProps> {
  id: string;
  name: string;
}

const AuthInput = ({
  id,
  name,
  type,
  className,
  onChange,
  value,
  labelValue,
  labelClass,
  maxLength,
  readOnly,
  setValue,
}: AuthinputProps) => {
  return (
    <BaseInput
      id={id}
      name={name}
      type={type ?? 'text'}
      className={`${style.authInput}${className ? ' ' + className : ''}`}
      readOnly={readOnly}
      onChange={onChange}
      value={value}
      labelValue={labelValue}
      labelClass={`${style.authInputLabel}${labelClass ? ' ' + labelClass : ''}`}
      maxLength={maxLength}
      setValue={setValue}
    />
  );
};

export default AuthInput;
