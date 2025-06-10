import React from 'react'
import { ButtonProps } from '../../../interfaces/buttonTypes'

const Button: React.FC<ButtonProps> = ({
    text,
    width,
    borderRadius = "5px",
    height = "40px",
    color,
    bgColor = "transparent",
    handleClick,
    padding = "0px 10px",
    border = "1px solid #200726",
    fontSize = "14px",
    fontWeight = "400",
    disabled,
    type
}) => {

  return (
    <button 
        style={{
            width: width,
            borderRadius: borderRadius,
            height: height,
            color: color,
            backgroundColor: bgColor,
            padding: padding,
            border: border,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: fontSize,
            fontWeight: fontWeight,
            outline: "none",
        }} 
        type={type}
        onClick={handleClick}
        disabled={disabled}
    >
        {text}
    </button>
  )
}

export default Button