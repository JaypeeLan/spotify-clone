import React from "react";
import { BoxProps } from "@/types";
import { twMerge } from "tailwind-merge";

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(`bg-neutral-500 rounded-lg h-fit w-full`, className)}
    >
      {children}
    </div>
  );
};

export default Box;