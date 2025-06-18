import styled from "styled-components"
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMovieBySlug, setSelectedMovie } from "../../features/movie/movieSlice";
import 'moment/locale/tr';
import Spinner from "../../components/loading/Loading";
import SeatSection from "../../components/seatSection/SeatSection";
import MovieDetailMain from "../../components/movieDetailMain/MovieDetailMain";
import { setSelectedScreening } from "../../features/seat/seatSlice";

const Container = styled.div<{ background: string }>`
    width: 100%;
    height: 100%;
`

const MovieDetail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { slug } = useParams<{ slug: string }>();
    const { selectedMovie } = useSelector((state: RootState) => state.movie);
    const {selectedScreening} = useSelector((state: RootState) => state.seat);
    
    useEffect(() => {
      if(!slug) return;
        dispatch(getMovieBySlug(slug));
    }, [slug])


    useEffect(() => {
      return () => {
        dispatch(setSelectedMovie(null));
        dispatch(setSelectedScreening(null));
      }
    }, [])
    
    if(!selectedMovie) {
      return (
        <div style={{width: "100%", height: "75vh"}}>
          <Spinner />
        </div>
      )
    }

  return (
    <Container background={selectedMovie.photo}>
      <div className="container">
        
        <MovieDetailMain /> 
    
        {
          selectedScreening && <SeatSection />
        }
      </div>
    </Container>
  )
}

export default MovieDetail