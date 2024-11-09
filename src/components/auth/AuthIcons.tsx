import icons from "@/public/icons/icon.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./styles/auth-icons.module.css";

export interface AuthIconsProps {
  type: "enter" | "cancel";
  size: "large" | "medium" | "small";
  className?: string;
}

const width = 120;
const height = 100;
const mediumFrameSize = "30px";
const smallFrameSize = "20px";

const AuthIcons = ({ type, size, className }: AuthIconsProps) => {
  const [position, setPosition] = useState({
    x: 120,
    y: 100,
  });

  useEffect(() => {
    const position = handlePosition();
    setPosition(position);
  }, []);

  const handlePosition = () => {
    const result = {
      x: 120,
      y: 100,
    };

    if (type === "enter") {
      if (size === "large") {
        // none
      } else if (size === "medium") {
        result.x = -90;
        result.y = 0;
      } else {
        result.x = -40;
        result.y = -30;
      }
    } else if (type === "cancel") {
      if (size === "large") {
        // none
      } else if (size === "medium") {
        // none
      } else {
        result.x = -60;
        result.y = -30;
      }
    }

    return result;
  };

  return (
    <div
      className={`${style.iconFrame}${className ? " " + className : ""}`}
      style={{
        width: size === "medium" ? mediumFrameSize : smallFrameSize,
        height: size === "medium" ? mediumFrameSize : smallFrameSize,
      }}
    >
      <Image
        src={icons}
        sizes="100%"
        width={width}
        height={height}
        alt={"아이콘"}
        style={{
          objectPosition: `${position.x}px ${position.y}px`,
        }}
      />
    </div>
  );
};

export default AuthIcons;
