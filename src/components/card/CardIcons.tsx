import icons from "@/public/icons/icon.png";
import style from "./styles/card-icons.module.css";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface CardIconsProps {
  type: "heart" | "answerd" | "heart-check" | "heart-none-check";
  className?: string;
}

const width = 120;
const height = 100;
const mediumFrameSize = "30px";
const smallFrameSize = "20px";

const CardIcons = ({ type, className }: CardIconsProps) => {
  const [position, setPosition] = useState({
    x: 120,
    y: 100,
  });

  useEffect(() => {
    const position = handlePosition();
    setPosition(position);
  }, [type]);

  const handlePosition = (): { x: number; y: number } => {
    if (type === "heart") {
      return {
        x: -20,
        y: -50,
      };
    } else if (type === "answerd") {
      return {
        x: 0,
        y: 0,
      };
    } else if (type === "heart-check") {
      return {
        x: -30,
        y: 0,
      };
    } else if (type === "heart-none-check") {
      return {
        x: -60,
        y: 0,
      };
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
        width: type === "heart" ? smallFrameSize : mediumFrameSize,
        height: type === "heart" ? smallFrameSize : mediumFrameSize,
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

export default CardIcons;
