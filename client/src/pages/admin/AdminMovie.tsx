import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { AppDispatch, RootState } from "../../store/store"
import { getAllMovies } from "../../features/movie/movieSlice"
import MovieCard from "../../components/cards/MovieCard"
import { MovieProps } from "../../interfaces/movieTypes"
import AdminMovieCard from "../../components/cards/AdminMovieCard."
import Button from "../../components/elements/buttons/Button"
import { showModal } from "../../features/modal/modalSlice"

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

    .movie-list{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }
    @media (max-width: 1200px) {
        .movie-list{
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media (max-width: 900px) {
        .movie-list{
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 600px) {
        .movie-list{
            grid-template-columns: 1fr;
        }
    }
`

const AdminMovie = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { movieList } = useSelector((state: RootState) => state.movie)

    useEffect(() => {
        dispatch(getAllMovies())
    }, [])

  return (
    <Container>
        <div className="container">
            <div className="title">
                <h1>Filmler</h1>
            </div>

            <div className="top-container">
                <Button color='#fff' width="200px" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Film Ekle" handleClick={() => dispatch(showModal("adminAddMovie"))} />
            </div>

            <div className="movie-list">
                {movieList?.map((movie: MovieProps) => (
                    <AdminMovieCard data={movie} />
                ))}
            </div>
        </div>
    </Container>
  )
}

export default AdminMovie