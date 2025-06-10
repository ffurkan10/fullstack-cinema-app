import React from "react";
import styled from "styled-components";
import { InputPasswordProps } from "../../../interfaces/inputTypes";
import * as IOIcons from 'react-icons/io5';

const Container = styled.div<{ width?: string, value?: string }>`
    position: relative;
    width: ${({ width }) => (width ? width : "100%")};
    height: 45px;

    input{
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-md);
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
        &:-webkit-autofill,
        &:-webkit-autofill:hover, 
        &:-webkit-autofill:focus, 
        &:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px white inset !important;
        }
    }

    input:focus ~ label{
        color: var(--dark-gray);
        transform: translateY(-13px);
        font-size: 10px !important;
    }

    label{
        position: absolute;
        color: var(--dark-gray);
        transform: ${({value}) => value && "translateY(-13px)"};
        bottom: 0px;
        top: 0;
        left: 15px;
        display: flex;
        align-items: center;
        font-size: ${({value}) => value ? "10px" : "12px"};
        font-weight: var(--font-weight-lg);
        pointer-events: none;
        transition:  all .3s ease;
        z-index: 5;
    }

    .eye-icon{
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        font-size: 20px;
        color: var(--dark-gray);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
`;

const InputPassword: React.FC<InputPasswordProps> = ({
  data,
  setData,
  name,
  labelText,
  disabled,
  width,
  placeHolder,
  type,
  handleClick
}) => {
  return (
    <Container value={data} width={width}>
      <input
        id={name}
        disabled={disabled}
        type={type}
        onChange={setData}
        value={data || ""}
        name={name}
        placeholder={placeHolder}
        />
        {labelText && <label htmlFor={name}>{labelText}</label>}
        <div className="eye-icon">
        {type === "password" ? 
          <span onClick={handleClick}>Göster</span>
        :
          <span onClick={handleClick}>Gizle</span>
        }
        </div>
    </Container>
  );
};

export default InputPassword;
