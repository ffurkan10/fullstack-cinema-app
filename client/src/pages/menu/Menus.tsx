import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllMenus } from '../../features/menu/menuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import MenuCard from '../../components/cards/MenuCard'
import { Link } from 'react-router-dom'

const Container = styled.div`
    width: 100%;
    height: 100%;
    .title{
      text-align: center;
      margin-block: 20px;
      h1{
        color: #fff;
      }
    }
    .error{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px;
      height: 40vh;
      h1{
        color: #fff;
      }
      p{
        color: #fff;
        font-size: var(--font-size-sm);
      }
    }

    .price-container{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-block: 30px;
      h1{
        color: #fff;
      }
      a{
        background-color: var(--color-main);
        color: #fff;
        padding: 10px 20px;
        border-radius: 10px;
        text-decoration: none;
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-md);
      }

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
      .price-container{
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
    }
`

const Menus = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { menuList } = useSelector((state: RootState) => state.menu)
  const {selectedSeatList} = useSelector((state: RootState) => state.seat)

  const menuTotal = menuList.reduce((acc, item) => {
    if (item.quantity && item.quantity > 0) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  const seatList = selectedSeatList as { price: number }[];
  const seatTotal = seatList.reduce((acc, item) => acc + item.price, 0);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const total = menuTotal + seatTotal;
    setTotalPrice(total);
  }, [menuTotal, seatTotal]);


  useEffect(() => {
    dispatch(getAllMenus())
  }, [])

  
  if(selectedSeatList.length < 1) {
    return (
      <Container>
        <div className="container">
          <div className="title">
            <h1>Menüler</h1>
          </div>
          <div className='error'>
            <h1>Henüz bir film seçmediniz!</h1>
            <p>Menü seçmek için lütfen filminizi seçin</p>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="container">
        <div className="price-container">
          <h1>Toplam Tutar: {totalPrice}₺</h1>
          <Link to={"/odeme"}>
            Ödeme Adımına Geç
          </Link>
        </div>
        <div className="menu-list">
          {menuList.map((menu) => (
            <MenuCard key={menu._id} data={menu} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Menus