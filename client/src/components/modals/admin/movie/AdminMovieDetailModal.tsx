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
import InputText from "../../../elements/inputs/InputText";
import InputNumber from "../../../elements/inputs/InputNumber";
import InputDate from "../../../elements/inputs/InputDate";
import moment from "moment";
import { deleteMovie, updateMovie } from "../../../../features/movie/movieSlice";

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
    width: 600px;
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
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
        }
    }
  }

  @media (max-width: 750px) {
    .modal {
      width: 400px;
    }
  }
  @media (max-width: 500px) {
    .modal {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
`;

const AdminMovieDetailModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedMovie } = useSelector((state: RootState) => state.movie);
  const { modalLocation } = useSelector((state: RootState) => state.modal);
  const { lockScroll, unlockScroll } = useScrollLock();

  const [data, setData] = useState({
    title: selectedMovie?.title,
    description: selectedMovie?.description,
    photo: selectedMovie?.photo,
    genre: selectedMovie?.genre,
    duration: selectedMovie?.duration,
    releaseDate: moment(selectedMovie?.releaseDate).format("YYYY-MM-DD"),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

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
    const updatedData = {
        title: data.title || "",  
        description: data.description || "",  
        photo: data.photo || "",  
        genre: data.genre || "",  
        duration: Number(data.duration),  
        releaseDate: moment(data.releaseDate).format("YYYY-MM-DD"), 
    };

    if (updatedData.title && updatedData.description && updatedData.photo && updatedData.genre && updatedData.duration && updatedData.releaseDate && selectedMovie?._id) {
        dispatch(updateMovie({ movieId: selectedMovie?._id, body: updatedData }) as any);  
    }
}

    const handleDelete = () => {
        if (selectedMovie?._id) {
            dispatch(deleteMovie(selectedMovie?._id) as any);
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
            <p>Film Detayları</p>
            <div className="input-container">
                <InputText data={data.title || ""} setData={(e) => handleChange(e)} name="title" labelText="Film Adı" width="100%" height="45px" />
                <InputText data={data.description || ""} setData={(e) => handleChange(e)} name="description" labelText="Film Özeti" width="100%" height="45px" />
                <InputText data={data.photo || ""} setData={(e) => handleChange(e)} name="photo" labelText="Film Fotoğrafı" width="100%" height="45px" />
                <InputText data={data.genre || ""} setData={(e) => handleChange(e)} name="genre" labelText="Film Türü" width="100%" height="45px" />
                <InputNumber data={data.duration || 0} setData={(e) => handleChange(e)} name="duration" labelText="Film Süresi" width="100%" height="45px" />
                <InputDate data={data.releaseDate || ""} setData={(e) => handleChange(e)} name="releaseDate" labelText="Vizyon Tarihi" width="100%" height="45px" />
            </div>
            <div className="button-container">
                <Button color='#fff' width="100%" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Kaydet" handleClick={handleSubmit} />
                <Button color='#fff' width="100%" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Kapat" handleClick={() => dispatch(showModal(null))} />
                <Button color='#fff' width="100%" bgColor='#96a825' border='1px solid #96a825' borderRadius='10px' text="Sil" handleClick={handleDelete} />
            </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminMovieDetailModal;
