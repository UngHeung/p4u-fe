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
  labelValue,
  labelClass,
  maxLength,
  readOnly,
}: AuthinputProps) => {
  return (
    <BaseInput
      id={id}
      name={name}
      type={type ?? 'text'}
      className={`${style.authInput}${className ? ' ' + className : ''}`}
      readOnly={readOnly}
      onChange={onChange}
      labelValue={labelValue}
      labelClass={`${style.authInputLabel}${labelClass ? ' ' + labelClass : ''}`}
      maxLength={maxLength}
    />
  );
};

export default AuthInput;
