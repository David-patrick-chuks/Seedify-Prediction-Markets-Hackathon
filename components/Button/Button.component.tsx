"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: () => void;
  color?: "blue" | "purple" | "yellow" | "green" | "red" | "orange" | "pink";
  prependIcon?: ReactNode;
}

export const Button = ({
  children,
  color = "blue",
  className = "",
  onClick,
  disabled = false,
  prependIcon,
  type = "button",
  ...props
}: ButtonProps) => {
  const defaultClassName =
    "outline-none text-xl flex justify-center gap-3 items-center px-4 py-2 rounded-lg cursor-pointer text-center transition-all duration-150 text-shadow-[0_4px_4px_rgba(0,0,0,.25)]";
  const active = "active:translate-y-1 active:-translate-x-1 active:[box-shadow:0_0px_0_0_#1b6ff8]";

  return (
    <button
      {...props}
      type={type}
      className={`${defaultClassName}
                ${color === "blue" && "[box-shadow:-4px_4px_0_0_#1A59B6] bg-gradient-to-b from-[#3CAFE1] to-[#0075E1]"} 
                ${
                  color === "purple" && "[box-shadow:-4px_4px_0_0_#443D8B] bg-gradient-to-b from-[#9A69FF] to-[#645DB3]"
                }
                ${color === "yellow" && "[box-shadow:-4px_4px_0_0_#C3BB04] bg-gradient-to-b from-[#FFD600] to-[#CF0]"}
                ${color === "green" && "[box-shadow:-4px_4px_0_0_#1AB655] bg-gradient-to-b from-[#25D843] to-[#23CF34]"}
                ${color === "red" && "[box-shadow:-4px_4px_0_0_#B81B53] bg-gradient-to-b from-[#FF1493] to-[#D52A68]"}
                ${
                  color === "orange" && "[box-shadow:-4px_4px_0_0_#C36B04] bg-gradient-to-b from-[#FF8A00] to-[#FFA300]"
                }
                ${color === "pink" && "[box-shadow:-4px_4px_0_0_#8604C3] bg-gradient-to-b from-[#CC00FF] to-[#FA00FF]"}
                ${disabled && "opacity-50 cursor-not-allowed"}
                ${active}
                ${className}
            `}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {prependIcon && prependIcon}
      {children}
    </button>
  );
};

interface RoundButtonProps {
  children?: any;
  style?: "mini" | "solid" | "outline";
  className?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
}

export const RoundButton = ({ children, variant = "primary", className = "", onClick }: RoundButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center h-14 w-14 rounded-full 
        ${variant === "primary" ? "bg-[#7930F4] border-[6px] border-[#9E89FF]" : ""} 
        ${variant === "outline" ? "border-primary border-[1px]" : ""} 
        ${className}
      `}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
};
