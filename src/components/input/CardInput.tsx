import BaseInput, { BaseInputProps } from "./BaseInput";

interface CardInputProps extends Partial<BaseInputProps> {
  name: string;
}

const CardInput = ({ id, name, className, onChange, readonly, placeholder }: CardInputProps) => {
  return (
    <BaseInput
      id={id}
      type={"text"}
      name={name}
      className={className ?? ""}
      onChange={onChange}
      readonly={readonly}
      placeholder={placeholder}
    />
  );
};

export default CardInput;
