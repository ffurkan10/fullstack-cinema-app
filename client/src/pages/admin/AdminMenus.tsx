import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../components/elements/buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getAllMenus } from '../../features/menu/menuSlice'
import AdminMenuCard from '../../components/cards/AdminMenuCard'
import { showModal } from '../../features/modal/modalSlice'

const Container = styled.div`
    width: 100%;
    height: 100%;

    .title{
        text-align: center;
        margin: 20px 0;
        h1{
            color: #fff;
        }
    }

    .top-container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 20px;
    }

    .menu-list{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    @media (max-width: 1200px){
      .menu-list{
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 900px){
      .menu-list{
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 500px){
      .menu-list{
        grid-template-columns: 1fr;
      }
    }

`

const AdminMenus = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { menuList } = useSelector((state: RootState) => state.menu)

    useEffect(() => {
        dispatch(getAllMenus())
    }, [])

  return (
    <Container>
        <div className="container">
            <div className="title">
                <h1>Menüler</h1>
            </div>

            <div className="top-container">
                <Button handleClick={() => dispatch(showModal("adminAddMenu"))} color='#fff' width="200px" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Menü Ekle" />
            </div>

            <div className="menu-list">
                {menuList.map((menu) => (
                    <AdminMenuCard key={menu._id} data={menu} />
                ))}
            </div>
        </div>
    </Container>
  )
}

export default AdminMenus