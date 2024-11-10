import icons from "@/public/icons/icon.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "./styles/auth-icons.module.css";

export interface AuthIconsProps {
  type: "enter" | "cancel" | "logout" | "pwIsShow" | "pwIsNotShow";
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
  }, [type, size]);

  const handlePosition = (): { x: number; y: number } => {
    if (type === "enter") {
      if (size === "large") {
        // none
      } else if (size === "medium") {
        return {
          x: -90,
          y: 0,
        };
      } else if (size === "small") {
        return {
          x: -40,
          y: -30,
        };
      }
    } else if (type === "cancel") {
      if (size === "large") {
        // none
      } else if (size === "medium") {
        // none
      } else if (size === "small") {
        return {
          x: -60,
          y: -30,
        };
      }
    } else if (type === "logout") {
      if (size === "large") {
        // none
      } else if (size === "medium") {
        // none
      } else if (size === "small") {
        return {
          x: -40,
          y: -50,
        };
      }
    } else if (type === "pwIsShow") {
      if (size === "large") {
        // none
      } else if (size === "medium") {
        // none
      } else if (size === "small") {
        return {
          x: 0,
          y: -30,
        };
      }
    } else if (type === "pwIsNotShow") {
      if (size === "large") {
        // none
      } else if (size === "medium") {
        // none
      } else if (size === "small") {
        return {
          x: -20,
          y: -30,
        };
      }
    }

    return {
      x: 0,
      y: 0,
    };
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
