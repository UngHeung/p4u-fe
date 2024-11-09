import BaseButton, { BaseButtonProps } from "./BaseButton";
import style from "./styles/auth-button.module.css";

interface AuthButtonProps extends Partial<BaseButtonProps> {
  id: string;
  value: { text?: string; icon?: JSX.Element };
}

const AuthButton = ({ id, value, type, className, onClick, disabled }: AuthButtonProps) => {
  return (
    <BaseButton
      id={id}
      value={value}
      type={type ?? "button"}
      className={`${style.authButton}${className ? " " + className : ""}`}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default AuthButton;
