import React, { ChangeEvent } from "react";
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

const InputBankAccount: React.FC<InputNumberProps> = ({
  data,
  setData,
  name,
  labelText,
  disabled,
  width,
  height
}) => {

  const formatAccountNumber = (value: string) => {
    let numericValue = value.replace(/\D/g, ""); //! Sadece rakamları al
    numericValue = numericValue.slice(0, 16); //! 16 karakter ile sınırlandır
    return numericValue.replace(/(.{4})/g, "$1 ").trim(); //! 4'erli gruplama
  };

    //! Input değiştiğinde formatlı olarak setData'ya aktar
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatAccountNumber(e.target.value);
    setData(e); //! Değişiklikleri üst bileşene gönder
  };
  
  return (
    <Container value={data} width={width} height={height}>
      <NumericFormat
        id={name}
        disabled={disabled}
        type="text"
        onChange={handleChange}
        value={data || ""}
        name={name}
        maxLength={19}
      />
      {labelText && <label htmlFor={name}>{labelText}</label>}
    </Container>
  );
};

export default InputBankAccount;
