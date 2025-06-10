import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { addFavorite, removeFavorite } from '../../features/favorite/favoriteSlice'
import moment from 'moment'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { clearSelectedSeatList, setSelectedScreening } from '../../features/seat/seatSlice'
import { Link } from 'react-router-dom'
import Spinner from '../loading/Loading'

const Container = styled.div`
      margin-top: 50px;
      display: flex;
      gap: 40px;
      margin-bottom: 20px;
      .left{
        img{
          border-radius: 10px;
        }
      }
      .right{
        display: flex;
        flex-direction: column;
        gap: 30px;
        .title{
          display: flex;
          align-items: center;
          gap: 20px;
          h1{
            color: #fff;
          }
          .favorite-icon{
            font-size: 20px;
            color: var(--color-main);
            background-color: #121212;
            padding: 10px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        p{
          color: #fff;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-md);
        }
        ul{
          list-style-type: none;
          padding-left: 0;
          display: flex;
          align-items: center;
          gap: 20px;
          .selected-screen{
            background-color: #fff !important;
            color: var(--color-main) !important;
            border: 1px solid var(--color-main);
          }
          li{
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-lg);
            background-color: var(--color-main);
            border: 1px solid var(--color-main);
            padding: 10px 20px;
            border-radius: 10px;
            color: #fff;
            cursor: pointer;
          }
        }
        .buttons{
          width: 200px;
          a{
            text-decoration: none;
            color: #fff;
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-md);
            background-color: var(--color-main);
            border: 1px solid var(--color-main);
            padding: 10px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      @media (max-width: 750px){
        flex-direction: column;
      }
`

const MovieDetailMain = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [isFavorite, setIsFavorite] = useState(false);
    const {selectedScreening, selectedSeatList} = useSelector((state: RootState) => state.seat);
    const {favoriteList} = useSelector((state: RootState) => state.favorite);
    const { selectedMovie } = useSelector((state: RootState) => state.movie);


    useEffect(() => {
        if (favoriteList && selectedMovie) {
            const isFav = favoriteList.some(fav => fav._id === selectedMovie._id);
            setIsFavorite(isFav);
        }
    }, [favoriteList, selectedMovie]);

    const handleScreeningClick = (screening: any) => {
        if(selectedScreening === screening) {
            dispatch(setSelectedScreening(null));
            dispatch(clearSelectedSeatList())
        }else{
            dispatch(setSelectedScreening(screening));
            dispatch(clearSelectedSeatList())
        }
    }

    if (!selectedMovie) {
        return (
            <div style={{ width: "100%", height: "75vh" }}>
                <Spinner />
            </div>
        );
    }

  return (
    <Container>
        <div className="left">
            <img src={selectedMovie.photo} alt={selectedMovie.title} />
        </div>
        <div className="right">
            <div className="title">
                <h1>{selectedMovie.title}</h1>
                {
                    isFavorite ? (
                        <div onClick={() => dispatch(removeFavorite(selectedMovie._id))} className="favorite-icon">
                            <FaHeart />
                        </div>
                    ) : (
                        <div onClick={() => dispatch(addFavorite(selectedMovie._id))} className="favorite-icon">
                            <FaRegHeart />
                        </div>
                    )
                }
            </div>
            <p>{selectedMovie.description}</p>
            <p><strong>Çıkış Tarihi:</strong> {moment(selectedMovie.releaseDate).format("DD.MM.YYYY")}</p>
            <p><strong>Saat:</strong> {selectedMovie.duration} dakika</p>
            <p><strong>Tür:</strong> {selectedMovie.genre}</p>
            <p><strong>Salon ve Formatlar:</strong> Salon {selectedMovie?.theater?.saloonId} / {selectedMovie?.theater?.facilities?.map(item => item)?.join(", ")}</p>
            <ul>
                {selectedMovie.theater.screenings.map((screening) => (
                <li className={screening._id === selectedScreening?._id ? "selected-screen" : ""} onClick={() => handleScreeningClick(screening)} key={screening._id}>
                    {moment(screening.startTime).format("LT")}
                </li>
                ))}
            </ul>
            {
                selectedScreening && selectedSeatList.length > 0 &&
                <div className="buttons">
                <Link to="/menuler">Bilet Al</Link>
                {/* <Button disabled={!selectedScreening} handleClick={handleSubmit} color='#fff' width="100%" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Bilet Al" /> */}
                </div>
            }
        </div>
    </Container>
  )
}

export default MovieDetailMain