import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AdminMovieDetailModal from '../components/modals/admin/movie/AdminMovieDetailModal';
import AdminAddMovieModal from '../components/modals/admin/movie/AdminAddMovieModal';
import AdminMatchMovieAndSaloonModal from '../components/modals/admin/screening/AdminMatchMovieAndSaloonModal';
import AdminAddMenuModal from '../components/modals/admin/menu/AdminAddMenuModal';
import AdminEditMenuModal from '../components/modals/admin/menu/AdminEditMenuModal';
import ResultModal from '../components/modals/ResultModal';

const ModalLayout = () => {

    const { modalType, nestedModalType } = useSelector((state: RootState) => state.modal);


  return (
    <>
        {modalType === "result" && <ResultModal />}
        {modalType === "adminMovieDetail" && <AdminMovieDetailModal />}
        {modalType === "adminAddMovie" && <AdminAddMovieModal />}
        {modalType === "adminMatchMovieAndSaloon" && <AdminMatchMovieAndSaloonModal />}
        {modalType === "adminAddMenu" && <AdminAddMenuModal />}
        {modalType === "adminEditMenu" && <AdminEditMenuModal />}
    </>
  )
}

export default ModalLayout