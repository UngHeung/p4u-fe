import BaseTextarea, { BaseTextareaProps } from './BaseTextarea';

export interface CardTextareaProps extends BaseTextareaProps {}

const CardTextarea = ({
  id,
  name,
  className,
  labelClassName,
  maxLength,
  onChange,
  placeholder,
}: CardTextareaProps) => {
  return (
    <BaseTextarea
      id={id}
      name={name}
      className={className}
      labelClassName={labelClassName}
      maxLength={maxLength}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default CardTextarea;
