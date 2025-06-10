import styled from "styled-components"
import InputBankAccount from "../elements/inputs/InputBankAccount"
import { ChangeEvent, useEffect, useState } from "react"
import InputNumber from "../elements/inputs/InputNumber"
import InputText from "../elements/inputs/InputText"
import InputSelect from "../elements/inputs/InputSelect"
import { MonthData } from "../../utils/months"
import { YearData } from "../../utils/years"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { setActiveSelect } from "../../features/layout/layoutSlice"
import Button from "../elements/buttons/Button"
import { updateSeats } from "../../features/seat/seatSlice"

const Container = styled.div`
    width: 400px;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    .payment-card{
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        h2{
            text-align: center;
        }
        .price{
            display: flex;
            align-items: center;
            justify-content: space-between;
            p{
                font-size: var(--font-size-md);
                font-weight: var(--font-weight-md);
            }
            span{
                font-size: var(--font-size-lg);
                font-weight: var(--font-weight-lg);
            }
        }
        form{
            display: flex;
            flex-direction: column;
            gap: 15px;
            .form-row-group{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
`

const PaymentCard = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { menuList } = useSelector((state: RootState) => state.menu)
    const {selectedScreening, selectedSeatList} = useSelector((state: RootState) => state.seat);

    const [data, setData] = useState({
        name: "",
        surname: "",
        bankAccount: "",
        cvv: ""
    })

    const [selectedYear, setSelectedYear] = useState<any>(null)
    const [selectedMonth, setSelectedMonth] = useState<any>(null)

    const [totalPrice, setTotalPrice] = useState<number>(0);
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const menuTotal = menuList.reduce((acc, item) => {
        if (item.quantity && item.quantity > 0) {
          return acc + item.price * item.quantity;
        }
        return acc;
    }, 0);
    
    const seatList = selectedSeatList as { price: number }[];
    const seatTotal = seatList.reduce((acc, item) => acc + item.price, 0);

    useEffect(() => {
        const total = menuTotal + seatTotal;
        setTotalPrice(total);
    }, [menuTotal, seatTotal]);

    const handleSubmit = () => {
        dispatch(updateSeats({screeningId: selectedScreening?._id, seatsToUpdate: selectedSeatList} as any))
    } 

  return (
    <Container onClick={() => dispatch(setActiveSelect(""))}>
        <div className="payment-card">
            <h2>Ödeme Bilgileri</h2>
            <div className="price">
                <p>Toplam Tutar: <span>{totalPrice}₺</span></p>
            </div>
            <form>
                <div className="form-group">
                    <InputText data={data?.name} setData={(e) => handleInputChange(e)} name="name" labelText="İsim" width="100%" />
                </div>
                <div className="form-group">
                    <InputText data={data?.surname} setData={(e) => handleInputChange(e)} name="name" labelText="Soyisim" width="100%" />
                </div>
                <div className="form-group">
                    <InputBankAccount data={data?.bankAccount} setData={handleInputChange} labelText="Kart Numarası" name="bankAccount" width="100%" />
                </div>
                <div className="form-row-group">
                    <InputSelect data={selectedMonth?.text} setData={setSelectedMonth} labelText="Ay" initialOptions={MonthData} name="selectedMonth" width="40%" />
                    <InputSelect data={selectedYear?.text} setData={setSelectedYear} labelText="Yıl" initialOptions={YearData} name="selectedYear" width="40%" />
                </div>
                <div className="form-group">
                    <InputNumber data={data?.cvv} setData={(e) => handleInputChange(e)} labelText="CVV" name="cvv" width="100%" />
                </div>
                <Button handleClick={handleSubmit} type="submit" color='#fff' width="100%" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Öde" />
            </form>
        </div>
    </Container>
  )
}

export default PaymentCard