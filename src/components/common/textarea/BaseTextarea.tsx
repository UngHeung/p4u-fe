import { useState } from 'react';

export interface BaseTextareaProps {
  id?: string;
  name: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BaseTextarea = ({
  id,
  name,
  className,
  labelClassName,
  placeholder,
  maxLength,
  onChange,
}: BaseTextareaProps) => {
  const [value, setValue] = useState('');

  return (
    <>
      <label
        htmlFor={id}
        className={labelClassName}
      >{`${value.length}/${maxLength}`}</label>
      <textarea
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={event => {
          const content = event.target.value;

          if (maxLength && content.length >= maxLength) {
            setValue(content.slice(0, maxLength - 1));
          } else {
            setValue(content);
          }

          if (onChange) {
            onChange(event);
          }
        }}
        value={value}
      />
    </>
  );
};

export default BaseTextarea;
