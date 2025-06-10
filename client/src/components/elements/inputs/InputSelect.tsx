import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InputMailProps, InputSelectProps, InputTextProps } from "../../../interfaces/inputTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setActiveSelect } from "../../../features/layout/layoutSlice";

const Container = styled.div<{ width?: string, value?: string, height?: string }>`
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

    .options{
        position: absolute;
        top: 40px;
        display: flex;
        flex-direction: column;
        z-index: 10;
        width: 100%;
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        max-height: 200px;
        overflow: auto;
        background-color: #fff;
        border: 1px solid var(--color-border2);
        .option{
            width: 100%;
            padding: 9px 20px;
            cursor: pointer;
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-md);
            &:hover{
                background-color: var(--color-border2);
            }
        }
    }
`;

const InputSelect: React.FC<InputSelectProps> = ({
  data,
  setData,
  name,
  labelText,
  disabled,
  width,
  placeHolder,
  height,
  initialOptions
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const {activeSelect} = useSelector((state: RootState) => state.layout)
  const [options, setOptions] = useState<any>([])

  useEffect(()=>{
      setOptions(initialOptions)
  },[initialOptions])


  const handleOptionClick = (item: any) => {
    dispatch(setActiveSelect(""))
    setData(item)
  }

  return (
    <Container onClick={(e) => e.stopPropagation()} value={data} width={width} height={height}>
        <input
          id={name}
          disabled={disabled}
          type="text"
          onChange={setData}
          value={data || ""}
          name={name}
          onClick={() => dispatch(setActiveSelect((activeSelect && activeSelect === name) ? "" : name))}
          placeholder={placeHolder}
        />
        {labelText && <label htmlFor={name}>{labelText}</label>}
        {
          activeSelect === name &&
          <div className="options">
            {
              options.map((item: any) => (
                <div key={item.id} className="option" onClick={() => handleOptionClick(item)}>
                    {item.text}
                </div>
              ))
            }
          </div>
        }
    </Container>
  );
};

export default InputSelect;
