import { ChangeEventHandler, useState } from 'react';

export interface BaseTextareaProps {
  id?: string;
  name: string;
  className?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BaseTextarea = ({
  id,
  name,
  className,
  placeholder,
  onChange,
}: BaseTextareaProps) => {
  const [value, setValue] = useState('');

  return (
    <textarea
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      onChange={event => {
        setValue(event.target.value);

        if (onChange) {
          onChange(event);
        }
      }}
      value={value}
    />
  );
};

export default BaseTextarea;
