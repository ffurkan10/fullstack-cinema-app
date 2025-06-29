import Header from "./components/layout/Header";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/entryPages/Login";
import Register from "./pages/entryPages/Register";
import Favorite from "./pages/favorite/Favorite";
import MovieDetail from "./pages/movies/MovieDetail";
import Movies from "./pages/movies/Movies";
import GlobalStyles from "./styles/globalStyles"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute"
import AdminMovie from "./pages/admin/AdminMovie";
import Admin from "./pages/admin/Admin";
import AdminLayout from "./layouts/AdminLayout";
import ModalLayout from "./layouts/ModalLayout";
import AdminMovieAndSaloon from "./pages/admin/AdminMovieAndSaloon";
import AdminMenus from "./pages/admin/AdminMenus";
import Menus from "./pages/menu/Menus";
import Payment from "./pages/payment/Payment";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <ModalLayout />
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/giris-yap" element={<Login />} />
          <Route path="/kayit-ol" element={<Register />} />

          <Route path="/" element={<Movies />} />
          <Route path="/filmler/:slug" element={<MovieDetail />} />
          <Route path="/favoriler" element={<Favorite />} />
          <Route path="/menuler" element={<Menus />} />
          <Route path="/odeme" element={<Payment />} />
        </Route>

        <Route 
          path="/" 
          element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route path="/admin/filmler" element={<AdminMovie />} />
          <Route path="/admin/filmler-ve-salonlar" element={<AdminMovieAndSaloon />} />
          <Route path="/admin/menuler" element={<AdminMenus />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App