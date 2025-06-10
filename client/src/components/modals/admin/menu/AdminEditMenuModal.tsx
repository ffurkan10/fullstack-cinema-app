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
import { addMovie, updateMovie } from "../../../../features/movie/movieSlice";
import { createMenu, updateMenu } from "../../../../features/menu/menuSlice";

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
            grid-template-columns: 1fr 1fr;
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

const AdminEditMenuModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { modalLocation } = useSelector((state: RootState) => state.modal);
  const { selectedMenu } = useSelector((state: RootState) => state.menu);
  const { lockScroll, unlockScroll } = useScrollLock();

  const [data, setData] = useState({
    name: selectedMenu?.name || "",
    photo: selectedMenu?.image || "",
    price: selectedMenu?.price || 0,
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
        name: data.name,
        image: data.photo,
        price: data.price,
    }
    if(data.name && data.photo && data.price && selectedMenu?._id){
        dispatch(updateMenu({id: selectedMenu?._id, body: updatedData}) as any);
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
            <p>Menü Detayları</p>
            <div className="input-container">
                <InputText data={data.name || ""} setData={(e) => handleChange(e)} name="name" labelText="Menü Adı" width="100%" height="45px" />
                <InputText data={data.photo || ""} setData={(e) => handleChange(e)} name="photo" labelText="Menü Fotoğrafı" width="100%" height="45px" />
                <InputNumber data={data.price || 0} setData={(e) => handleChange(e)} name="price" labelText="Fiyat" width="100%" height="45px" />
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

export default AdminEditMenuModal;
