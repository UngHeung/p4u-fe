import { ButtonHTMLAttributes } from 'react';
import style from './styles/auth-button.module.css';

const Button = ({
  props,
  icon,
}: {
  props: ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: JSX.Element;
}) => {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      className={`${style.authButton}${props.className ? ' ' + props.className : ''}`}
    >
      {props.value} {icon ?? null}
    </button>
  );
};

export default Button;
