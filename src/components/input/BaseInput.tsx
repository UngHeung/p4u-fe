import { useState } from "react";

export type BaseInputTypes = "text" | "password";

export interface BaseInputProps {
  id: string;
  name: string;
  type: BaseInputTypes;
  className: string;
  readonly?: boolean;
  onChange?: () => void;
  labelValue?: string;
  labelClass?: string;
}

const BaseInput = ({ id, name, onChange, type, readonly, className, labelValue, labelClass }: BaseInputProps) => {
  const [value, setValue] = useState("");

  return (
    <>
      {labelValue && (
        <label className={labelClass} htmlFor={id}>
          {labelValue}
        </label>
      )}
      <input
        id={id}
        value={value}
        name={name}
        type={type}
        className={className}
        onChange={(event) => {
          setValue(event.target.value);
          onChange && onChange();
        }}
        readOnly={readonly ?? false}
      />
    </>
  );
};

export default BaseInput;
