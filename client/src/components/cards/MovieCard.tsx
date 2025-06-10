import styled from 'styled-components'
import { MovieProps } from '../../interfaces/movieTypes'
import 'moment/locale/tr';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart  } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addFavorite, removeFavorite } from '../../features/favorite/favoriteSlice';
import { useEffect, useState } from 'react';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    position: relative;
    .favorite-icon{
        position: absolute;
        top: 25px;
        right: 25px;
        font-size: 20px;
        color: var(--color-main);
        background-color: #121212;
        padding: 10px;
        border-radius: 50%;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
    }
    a{
        text-decoration: none;
    }
    &:hover{
        transform: scale(1.02);
        transition: all 0.3s ease;
    }
    .image-box{
        width: 100%;
        height: 450px;
        margin-bottom: 20px;
        img{
            border-radius: 10px;
            width: 100%;
            height: 100%;
        }
    }
    .text-box{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        gap: 15px;
        text-align: center;
        .top-text{
            display: flex;
            flex-direction: column;
            gap: 15px;
            h2{
                color: #fff;
            }
        }
        .genre-time{
            display: flex;
            flex-direction: column;
            gap: 10px;
             p{
                font-size: var(--font-size-sm);
                font-weight: var(--font-weight-lg);
                color: var(--color-text);
            }
        }
    }
`

const MovieCard = ({data}: {data:  MovieProps}) => {

    const dispatch = useDispatch<AppDispatch>();
    const {favoriteList} = useSelector((state: RootState) => state.favorite);
    const [isFavorite, setIsFavorite] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (favoriteList) {
            const isFav = favoriteList.some(fav => fav._id === data._id);
            setIsFavorite(isFav);
        }
    }, [favoriteList, data._id]);

  return (
    <Container>
        {
        token &&
            <div className="favorite-icon" onClick={() => {
                if (isFavorite) {
                    dispatch(removeFavorite(data._id));
                } else {
                    dispatch(addFavorite(data._id));
                }
            }
            }>
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </div>
                    
        }
        {/* {   
            isFavorite ? (
                <div onClick={() => dispatch(removeFavorite(data._id))} className="favorite-icon">
                    <FaHeart />
                </div>
            ) : (
                <div onClick={() => dispatch(addFavorite(data._id))} className="favorite-icon">
                    <FaRegHeart />
                </div>
            )
        } */}
        
        <Link to={`/filmler/${data.slug}`}>

            <div className='image-box'>
                <img src={data.photo} alt="" />
            </div>
            <div className='text-box'>
                <div className="top-text">
                    <h2>{data.title}</h2>
                </div>
                <div className="genre-time">
                    <p>{data.duration} dk</p>
                    <p>{data.genre}</p>
                </div>
            </div>
        </Link>
    </Container>
  )
}

export default MovieCard