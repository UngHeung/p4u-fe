export type BaseButtonTypes = "button" | "submit";
export type BaseButtonIconTypes = "submit" | "back" | "none";
export interface BaseButtonProps {
  id: string;
  value: { text?: string; icon?: JSX.Element };
  type: BaseButtonTypes;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BaseButton = ({ id, value, type, className, onClick, disabled }: BaseButtonProps) => {
  return (
    <>
      <button
        id={id}
        type={type}
        className={className}
        onClick={() => {
          onClick && onClick();
        }}
        disabled={disabled ?? false}
      >
        {value.text} {value.icon}
      </button>
    </>
  );
};

export default BaseButton;
