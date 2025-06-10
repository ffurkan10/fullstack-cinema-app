import { MouseEventHandler } from "react";

export interface ButtonProps {
    text: string;
    width?: string;
    height?: string;
    color?: string;
    bgColor?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    padding?: string;
    border?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }