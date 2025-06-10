import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { showModal } from '../../features/modal/modalSlice';
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Button from '../elements/buttons/Button';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    box-shadow: 0px 2px 9px 0px #0000001F;
    .modal{
        width: 600px;
        height: auto;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        gap: 20px;
        .successIcon{
            font-size: 50px;
            color: #fff;
            background-color: var(--color-main);
            width: 70px;
            height: 70px;
            padding: 20px;
            border-radius: 50%;
        }
        .errorIcon{
            font-size: 50px;
            color: #fff;
            background-color: var(--color-main);
            width: 70px;
            height: 70px;
            padding: 20px;
            border-radius: 50%;
        }
        p{
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-lg);
        }
    }

`


const ResultModal = () => {
  const { resultModalData } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(showModal(null));
      if(resultModalData.link){
        window.location.href = resultModalData.link;
      }
    }, 3000);

    return () => clearTimeout(timer); 
  }, [dispatch, resultModalData.link]);

  return (
    <Container>
      <div className="modal">
        {resultModalData.resultType === "success" ? (
          <FaCheck className="successIcon" />
        ) : (
          <IoMdClose className="errorIcon" />
        )}
        <p>{resultModalData.message}</p>
        <Button 
          text="Kapat" 
          handleClick={() => dispatch(showModal(null))} 
          bgColor="#96a825" 
          color="#fff" 
          padding="5px 15px" 
          border="1px solid #96a825" 
        />
      </div>
    </Container>
  )
}

export default ResultModal