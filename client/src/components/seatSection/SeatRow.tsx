import styled from "styled-components"
import { SeatProps } from "../../interfaces/movieTypes"
import { PiArmchairFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setSelectedSeatList } from "../../features/seat/seatSlice";
import { useEffect, useState } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    position: relative;
    .info{
        position: absolute;
        top: 10px;
        left: 30px;
        right: 0px;
        text-align: center;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: var(--font-size-sm);
        width: 100%;
        height: 100%;
    }
    .seat-icon{
            cursor: pointer;
    }
    .seat{
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-lg);
    }
    .available{
        color: var(--color-bg2);
    }
    .unavailable{
        color: var(--color-blue);
    }
    .selected{
        color: var(--color-bg3);
    }
`

const SeatRow = ({data}: {data: SeatProps}) => {

    const dispatch = useDispatch<AppDispatch>()
    const {selectedSeatList} = useSelector((state: RootState) => state.seat)
    const isSelected = selectedSeatList.some((item) => item._id === data._id);
    const [info, setInfo] = useState<string>("")

    const handleSeatClick = () => {
        if(data.isAvailable){
            dispatch(setSelectedSeatList(data))
        }else{
            setInfo("Dolu koltuk")
            setTimeout(() => {
                setInfo("")
            }, 2000)
        }
    }

  return (
    <Container>
        <div className="seat">
            {data.seatLetter} {data.seatNumber}
        </div>
        <div onClick={handleSeatClick} className={`seat-icon ${data.isAvailable ? "available" : "unavailable"} ${isSelected ? "selected" : ""}`}>
            <PiArmchairFill size={30} />
        </div>
        {info && <div className="info">{info}</div>}
    </Container>
  )
}

export default SeatRow