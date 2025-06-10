import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { RootState } from "../../../../store/store";
import { showModal } from "../../../../features/modal/modalSlice";
import { useScrollLock } from "../../../../hooks/useScrollLock";
import { setActiveSelect } from "../../../../features/layout/layoutSlice";
import Button from "../../../elements/buttons/Button";
import InputSelectMovie from "../../../elements/inputs/InputSelectMovie";
import { getAllMovies } from "../../../../features/movie/movieSlice";
import InputSelectTheater from "../../../elements/inputs/InputSelectTheater";
import { getAllTheaters } from "../../../../features/theater/theaterSlice";
import { createMatch } from "../../../../features/match/matchSlice";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 26;

  .modal {
    width: 500px;
    height: auto;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;

    .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
        p{
            font-size: var(--font-size-xxl);
            font-weight: var(--font-weight-lg);
            color:var(--dark-gray);
            text-align: center;
        }
        .input-container{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .button-container{
            margin-top: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
    }
  }

  @media (max-width: 500px) {
    .modal {
      width: 100%;
      height: 100%;
      border-radius: 0;
      .content{
        justify-content: center;
      }
    }
  }
`;

const AdminMatchMovieAndSaloonModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { modalLocation } = useSelector((state: RootState) => state.modal);
  const { movieList } = useSelector((state: RootState) => state.movie);
    const { theaterList } = useSelector((state: RootState) => state.theater);
  const { lockScroll, unlockScroll } = useScrollLock();
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [selectedTheater, setSelectedTheater] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllMovies() as any)
    dispatch(getAllTheaters() as any)
  }, [])


  //! bu modal açıldığnda ekran ı lock lamak için
  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  //! bu başka bir sayfaya geçildiğinde modal ı kapatmak için
  useEffect(() => {
    if (location.pathname !== modalLocation) {
      dispatch(showModal(null));
    }
  }, [dispatch, location.pathname, modalLocation]);

  const handleSubmit = () => {
    const body = {
        movie: selectedMovie?._id,
        theater: selectedTheater?._id,
    }

    if (body.movie && body.theater) {
      dispatch(createMatch(body) as any)
    }
}

  return (
    <Container onClick={() => dispatch(showModal(null))}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setActiveSelect(""));
        }}
      >
        <div className="content">
            <p>Film Salon Eşleştir</p>
            <div className="input-container">
                <InputSelectMovie data={selectedMovie?.title} setData={setSelectedMovie} name="selectedMovie" labelText="Film" width="100%" height="45px" initialOptions={movieList} />
                <InputSelectTheater data={selectedTheater && `Salon ${selectedTheater?.saloonId}`} setData={setSelectedTheater} name="selectedTheater" labelText="Salon" width="100%" height="45px" initialOptions={theaterList} />
            </div>
            <div className="button-container">
                <Button color='#fff' width="100%" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Kaydet" handleClick={handleSubmit} />
                <Button color='#fff' width="100%" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Kapat" handleClick={() => dispatch(showModal(null))} />
            </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminMatchMovieAndSaloonModal;
