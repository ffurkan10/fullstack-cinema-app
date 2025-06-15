import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { getAllMovies } from '../../features/movie/movieSlice';
import MovieCard from '../../components/cards/MovieCard';
import { getAllFavorites } from '../../features/favorite/favoriteSlice';

const Container = styled.div`
    width: 100%;
    height: 100%;
    .title{
        color: #fff;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 40px;
    }
    .movies-content{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 40px;
    }

    @media (max-width: 1300px){
        .movies-content{
            grid-template-columns: repeat(3, 1fr);
        }
    }
    
    @media (max-width: 900px){
        .movies-content{
            grid-template-columns: repeat(2, 1fr);
        }
    }
     @media (max-width: 700px){
        .movies-content{
            gap: 20px;
        }
    }
    @media (max-width: 550px){
        .movies-content{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }
    }
`

const Movies = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {movieList} = useSelector((state: RootState) => state.movie);

    useEffect(() => {
        dispatch(getAllMovies())
        dispatch(getAllFavorites());
    }, [])

  return (
    <Container>
        <div className="container">
            <h1 className="title">Cineverse Filmler</h1>
            <div className="movies-content">
                {
                    movieList && movieList.map((item) => (
                        <MovieCard data={item} />
                    ))
                }
            </div>
        </div>
    </Container>
  )
}

export default Movies