import BaseTextarea, { BaseTextareaProps } from './BaseTextarea';

export interface CardTextareaProps extends BaseTextareaProps {}

const CardTextarea = ({
  id,
  name,
  className,
  onChange,
  placeholder,
}: CardTextareaProps) => {
  return (
    <BaseTextarea
      id={id}
      name={name}
      className={className}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CardTextarea;
