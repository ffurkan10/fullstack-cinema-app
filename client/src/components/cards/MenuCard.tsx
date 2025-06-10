import React from 'react'
import { MenuProps } from '../../interfaces/menuTypes'
import styled from 'styled-components'
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addMenutoCart, removeMenufromCart } from '../../features/menu/menuSlice';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
        .menu-image{
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
    
        .menu-title{
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-lg);
        }
    
        .menu-price{
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-md);
        }
        .quantity-container{
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          .quantity{
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-lg);
            color: var(--color-main);
          }
          .quantity-icon{
            font-size: var(--font-size-lg);
            color: var(--color-main);
            cursor: pointer;
          }
        }
`

const MenuCard = ({data}: {data: MenuProps}) => {

  const dispatch = useDispatch<AppDispatch>()

  return (
    <Container>
      <img src={data.image} alt={data.name} className="menu-image" />
      <p className="menu-title">{data.name}</p>
      <p className="menu-price">{data.price} TL</p>
      <div className="quantity-container">
        <CiCircleMinus onClick={() => dispatch(removeMenufromCart(data))} size={30} className="quantity-icon" />
        <p className="quantity">{data.quantity || 0}</p>
        <CiCirclePlus onClick={() => dispatch(addMenutoCart(data))} size={30} className="quantity-icon" />
      </div>
    </Container>
  )
}

export default MenuCard