import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setIsOpenAccount } from '../../features/layout/layoutSlice';
import HeaderUserCard from '../cards/HeaderUserCard';
import hamburger from "../../assets/hamburger.svg"
import X from "../../assets/X.svg"
import { useEffect, useState } from 'react';
import { logout } from '../../features/auth/authSlice';

const Container = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #121212;

`

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo-box{
        img {
        width: 200px;
        height: auto;
            @media (max-width: 1000px) {
                width: 150px;
            }
        }
    }
    .header-links{
        display: flex;
        align-items: center;
        gap: 30px;
        .avatar{
            background-color: var(--color-main);
            padding: 10px 15px;
            border-radius: 50%;
            color: #fff;
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-md);
            text-decoration: none;
            cursor: pointer;
        }
        a{
            color: #fff;
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-md);
            text-decoration: none;
        }
        .auth-links{
            a{
                background-color: var(--color-main);
                padding: 10px 15px;
                border-radius: 5px;
            }
        }
    }

    @media (max-width: 650px){
        display: none;
    } 
`

const MobileHeader = styled.div`
    
    display: none;
    @media (max-width: 650px) {
        display: flex;
        align-items: center;
        height: 80px;
        background-color: #121212;
    }
`

const MobileMenu = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px;
  
    .top-side{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .close-btn {
            display: flex;
            font-size: 36px;
            color: #fff;
            cursor: pointer;
        }
        .logo-box{
            width: 200px;
            img{
                width: 100%;
                
            }
        }
    }

    .auth-links{
        a{
            background-color: var(--color-main);
            padding: 10px 15px;
            border-radius: 5px;
        }
    }

    a{
        color: #fff;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-lg);
        text-decoration: none;
    }

    .account{
        border-top: 1px solid var(--color-text);
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        p{
            color: #fff;
            font-size: var(--font-size-md);
            font-weight: var(--font-weight-md);
        }
        .auth-links{
            p{
                background-color: var(--color-main);
                padding: 10px 15px;
                border-radius: 5px;
                width: fit-content;
            }
        }
    }

    
`


const Header = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("token");
    const {user} = useSelector((state: RootState) => state.auth);
    const {isOpenAccount} = useSelector((state: RootState) => state.layout);
    const path = useLocation().pathname;
    const [activeMenu, setActiveMenu] = useState(false)

    useEffect(() => {
        if (activeMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [activeMenu]);
   
  return (
    <Container>
        <div className="container">
            <HeaderContent>
                <Link to={"/"} className="logo-box">
                    <img src={logo} alt="" />
                </Link>
                <div className="header-links">
                    <Link to="/">Anasayfa</Link>
                    <Link to="/favoriler">Favoriler</Link>
                    {
                        token ?
                        <div onClick={() => dispatch(setIsOpenAccount(!isOpenAccount))} className='avatar'>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        :
                        <div className='auth-links'>
                            <Link to="/giris-yap">Giriş Yap / Üye Ol</Link>
                        </div>
                    }
                    
                </div>

                {
                    isOpenAccount && token &&
                    <HeaderUserCard />
                }
            </HeaderContent>

            <MobileHeader>
                <div onClick={() => setActiveMenu(true)} className="hamburger">
                    <img src={hamburger} alt="" />
                </div>
            </MobileHeader>

            {activeMenu && (
                <MobileMenu>
                    <div className="top-side" > 
                        <Link to={"/"} onClick={() => setActiveMenu(false)} className="logo-box">
                            <img src={logo} alt="" />
                        </Link>

                        <div className="close-btn" onClick={() => setActiveMenu(false)}>
                            <img src={X} alt="" /> 
                        </div>
                    </div>
                    
                    <Link onClick={() => setActiveMenu(false)} to="/">Anasayfa</Link>
                    <Link onClick={() => setActiveMenu(false)} to="/favoriler">Favoriler</Link>
                    {
                        token ?
                        <div onClick={() => dispatch(setIsOpenAccount(!isOpenAccount))} className='account'>
                            <p>{user?.name}</p>
                            <p>{user?.email}</p>
                            <div onClick={() => dispatch(logout())} className='auth-links'>
                                <p>Çıkış Yap</p>
                            </div>
                        </div>
                        :
                        <div onClick={() => setActiveMenu(false)} className='auth-links'>
                            <Link to="/giris-yap">Giriş Yap / Üye Ol</Link>
                        </div>
                    }
                </MobileMenu>
            )}

        </div>
    </Container>
  )
}

export default Header