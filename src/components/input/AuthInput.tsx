"use clinet";

import BaseInput, { BaseInputProps } from "./BaseInput";
import style from "./styles/auth-input.module.css";

interface AuthinputProps extends Partial<BaseInputProps> {
  id: string;
  name: string;
}

const AuthInput = ({ id, name, className, readonly, onChange, labelValue, labelClass }: AuthinputProps) => {
  return (
    <BaseInput
      id={id}
      name={name}
      className={style.authInput + className ? " " + className : ""}
      readonly={readonly}
      onChange={onChange}
      labelClass={style.authInputLabel + labelClass ? " " + labelClass : ""}
      labelValue={labelValue}
    />
  );
};

export default AuthInput;
