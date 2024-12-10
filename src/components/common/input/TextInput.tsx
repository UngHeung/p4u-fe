'use client';

import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import style from './styles/auth-input.module.css';

export type TextInputTypes = 'text' | 'password';

export interface labelProps {
  id?: string;
  className?: string;
  htmlFor: string;
  value: string;
}

const TextInput = ({
  inputProps,
  labelProps,
}: {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  labelProps?: labelProps;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      {labelProps && (
        <label
          {...labelProps}
          className={`${style.authInputLabel}${labelProps.className ? ' ' + labelProps.className : ''}`}
        >
          {labelProps.value}
        </label>
      )}
      <input
        {...inputProps}
        onChange={inputProps.onChange ?? handleChange}
        value={inputProps.value ?? inputValue}
        className={`${style.authInput}${inputProps.className ? ' ' + inputProps.className : ''}`}
      />
    </>
  );
};

export default TextInput;
