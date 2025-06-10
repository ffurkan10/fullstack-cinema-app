import React from 'react'
import { MenuProps } from '../../interfaces/menuTypes'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { showModal } from '../../features/modal/modalSlice'
import Button from '../elements/buttons/Button'
import { deleteMenu, setSelectedMenu } from '../../features/menu/menuSlice'

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
`

const AdminMenuCard = ({data}: {data: MenuProps}) => {

  const dispatch = useDispatch<AppDispatch>()
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(deleteMenu(data._id))
  }

  return (
    <Container onClick={(() => {dispatch(setSelectedMenu(data)); dispatch(showModal("adminEditMenu"))})}>
      <img src={data.image} alt={data.name} className="menu-image" />
      <p className="menu-title">{data.name}</p>
      <p className="menu-price">{data.price} TL</p>
      <div className="button">
        <Button handleClick={(e) => handleDelete(e)} color='#fff' width="100%" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Menüyü Sil" />
      </div>
    </Container>
  )
}

export default AdminMenuCard