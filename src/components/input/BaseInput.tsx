"ues client";

import React, { useState } from "react";

export interface BaseInputProps {
  id: string;
  name: string;
  className: string;
  readonly?: boolean;
  onChange?: () => void;
  labelValue?: string;
  labelClass?: string;
}

const BaseInput = ({ id, name, onChange, readonly, className, labelValue, labelClass }: BaseInputProps) => {
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
