import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store/store'
import { logout } from '../../features/auth/authSlice'
import styled from 'styled-components'
import { setIsOpenAccount } from '../../features/layout/layoutSlice'

const Container = styled.div`
    position: absolute;
    top: 80px;
    right: 50px;
    padding: 20px;
    background-color: #121212;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    z-index: 999;
    .account-box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        .actions{
            display: flex;
            flex-direction: column;
            gap: 15px;
            a, p{
                color: #fff;
                font-size: var(--font-size-sm);
                font-weight: var(--font-weight-md);
                text-decoration: none;
                cursor: pointer;
            }
        }
        hr{
            background-color: var(--color-text);
        }
        .account-info{
            display: flex;
            flex-direction: column;
            gap: 10px;
            p{
                color: var(--color-text);
                font-size: var(--font-size-md);
                font-weight: var(--font-weight-md);
                text-decoration: none;
            }
        }
    }
`


const HeaderUserCard = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector((state: RootState) => state.auth)
    const userRole = localStorage.getItem("userRole")

  return (
    <Container>
        <div className="account-box">
            <div className="account-info">
                <p>{user?.name}</p>
                <p>{user?.email}</p>
            </div>
            <hr />
            <div onClick={() => dispatch(setIsOpenAccount(false))} className="actions">
                {
                    userRole === "admin" && (
                        <Link to="/admin/filmler">Admin Paneli</Link>
                    )
                }
                <p onClick={() => dispatch(logout())}>Çıkış Yap</p>
            </div>
        </div>
    </Container>
  )
}

export default HeaderUserCard