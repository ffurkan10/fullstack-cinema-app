import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../../store/store"
import { SeatProps } from "../../interfaces/movieTypes"
import groupSeatsByLetter from "../../helpers/groupSeatsByLetter"
import SeatRow from "./SeatRow"

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-block: 30px;
    .seat-section{
      display: flex;
      flex-direction: column;
      background-color: var(--color-border2);
      padding: 20px;
      gap: 20px;
      border-radius: 10px;
      .seat-list{
        display: flex;
        gap: 20px;
        justify-content: space-between;
        
      }
    }
`

const SeatSection = () => {

  const { selectedScreening } = useSelector((state: RootState) => state.seat)

  const groupedSeats = groupSeatsByLetter(selectedScreening?.seats || []);

  return (
    <Container>
      <div className="seat-section">
          {groupedSeats?.A?.length > 0 && 
            <div className="seat-list">
              {groupedSeats.A.map((seat: SeatProps) => (
                <SeatRow data={seat} />
              ))}
            </div>
          }
          {groupedSeats?.B?.length > 0 && 
            <div className="seat-list">
              {groupedSeats.B.map((seat: SeatProps) => (
                <SeatRow data={seat} />
              ))}
            </div>
          }
          {groupedSeats?.C?.length > 0 && 
            <div className="seat-list">
              {groupedSeats.C.map((seat: SeatProps) => (
                <SeatRow data={seat} />
              ))}
            </div>
          }
          {groupedSeats?.D?.length > 0 && 
            <div className="seat-list">
              {groupedSeats.D.map((seat: SeatProps) => (
                <SeatRow data={seat} />
              ))}
            </div>
          }
          {groupedSeats?.E?.length > 0 && 
            <div className="seat-list">
              {groupedSeats.E.map((seat: SeatProps) => (
                <SeatRow data={seat} />
              ))}
            </div>
          }
        
      </div>
    </Container>
  )
}

export default SeatSection