import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import styled from 'styled-components'
import Button from '../../components/elements/buttons/Button'
import { showModal } from '../../features/modal/modalSlice'
import AdminScreenCard from '../../components/cards/AdminScreenCard'
import { getAllMovies } from '../../features/movie/movieSlice'
import { getAllMatches } from '../../features/match/matchSlice'

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

    .screen-list{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    @media (max-width: 1200px) {
      .screen-list{
          grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 900px) {
      .screen-list{
          grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 600px) {
      .screen-list{
        grid-template-columns:1fr;
    }
    }
`

const AdminMovieAndSaloon = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { matchList } = useSelector((state: RootState) => state.match)

  useEffect(() => {
      dispatch(getAllMatches())
  }, [])

  return (
    <Container>
      <div className="container">
        <div className="title">
          <h1>Filmler Ve Salonlar</h1>
        </div>
        <div className="top-container">
          <Button color='#fff' width="200px" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Film/Salon Eşleştir" handleClick={() => dispatch(showModal("adminMatchMovieAndSaloon"))} />
        </div>

        <div className="screen-list">
          {matchList?.map((match) => (
            <AdminScreenCard data={match} key={match._id} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default AdminMovieAndSaloon