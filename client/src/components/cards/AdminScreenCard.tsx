import React from 'react'
import { MovieProps, ScreeningProps } from '../../interfaces/movieTypes'
import styled from 'styled-components'
import moment from 'moment'
import Button from '../elements/buttons/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { MatchProps } from '../../interfaces/matchTypes'
import { removeMatch } from '../../features/match/matchSlice'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #1c1c1c;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .screening-info{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      p{
        font-size: var(--font-size-md);
        color: #fff;
        font-weight: var(--font-weight-lg);
      }
    }
`

const AdminScreenCard = ({data}: {data: MatchProps} ) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    dispatch(removeMatch({id: data._id, movieId: data.movie._id}))
  }
    
  return (
    <Container>
        <div className="screening-info">
            <p>{data.movie.title}</p>
            <p>Salon {data?.theater?.saloonId}</p> 
            <p>{data?.theater?.screenings.map(item => moment(item?.startTime).format("LT")).join(" - ")}</p>
            <Button color='#fff' width="200px" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Eşleşmeyi Kaldır" handleClick={handleDelete} />
        </div>
    </Container>
  )
}

export default AdminScreenCard