import { Link, useLocation } from 'react-router-dom';
// import logo from '../../assets/loft_cinema.svg'
import logo from '../../assets/logo.svg'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setIsOpenAccount } from '../../features/layout/layoutSlice';
import HeaderUserCard from '../cards/HeaderUserCard';

const Container = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #121212;
    .header-content{
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
    }
`


const Header = () => {

    
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("token");
    const {user} = useSelector((state: RootState) => state.auth);
    const {isOpenAccount} = useSelector((state: RootState) => state.layout);
    const path = useLocation().pathname;
   
  return (
    <Container>
        <div className="container">
            <div className="header-content">
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
            </div>
        </div>
    </Container>
  )
}

export default Header