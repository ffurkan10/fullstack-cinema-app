import styled from 'styled-components'
import { MovieProps } from '../../interfaces/movieTypes'
import 'moment/locale/tr';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { showModal } from '../../features/modal/modalSlice';
import { setSelectedMovie } from '../../features/movie/movieSlice';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    position: relative;
   
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

const AdminMovieCard = ({data}: {data:  MovieProps}) => {

    const dispatch = useDispatch<AppDispatch>();
  

  return (
    <Container onClick={() => {dispatch(setSelectedMovie(data)); dispatch(showModal("adminMovieDetail"))}}>
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
    </Container>
  )
}

export default AdminMovieCard