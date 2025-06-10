import React from "react";
import styled from "styled-components";
import { InputNumberProps } from "../../../interfaces/inputTypes";
import { NumericFormat } from 'react-number-format';

const Container = styled.div<{ width?: string, value?: string | number | null, height?: string }>`
  position: relative;
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};

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
        font-size: 9px !important;
    }

    label{
        position: absolute;
        color: var(--dark-gray);
        transform: ${({value}) => value && "translateY(-13px)"};
        font-size: ${({value}) => value ? "10px" : "12px"};
        bottom: 0px;
        top: 0;
        left: 15px;
        display: flex;
        align-items: center;
        font-weight: var(--font-weight-lg);
        pointer-events: none;
        transition:  all .3s ease;
        z-index: 5;
    }
`;

const InputNumber: React.FC<InputNumberProps> = ({
  data,
  setData,
  name,
  labelText,
  disabled,
  width,
  height
}) => {
  
  return (
    <Container value={data} width={width} height={height}>
      <NumericFormat
        id={name}
        disabled={disabled}
        type="text"
        onChange={setData}
        value={data || ""}
        name={name}
      />
      {labelText && <label htmlFor={name}>{labelText}</label>}
    </Container>
  );
};

export default InputNumber;
