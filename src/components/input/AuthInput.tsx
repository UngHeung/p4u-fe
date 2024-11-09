import BaseInput, { BaseInputProps } from "./BaseInput";
import style from "./styles/auth-input.module.css";

interface AuthinputProps extends Partial<BaseInputProps> {
  id: string;
  name: string;
}

const AuthInput = ({ id, name, type, className, readonly, onChange, labelValue, labelClass }: AuthinputProps) => {
  return (
    <BaseInput
      id={id}
      name={name}
      type={type ?? "text"}
      className={`${style.authInput}${className ? " " + className : ""}`}
      readonly={readonly}
      onChange={onChange}
      labelValue={labelValue}
      labelClass={`${style.authInputLabel}${labelClass ? " " + labelClass : ""}`}
    />
  );
};

export default AuthInput;
