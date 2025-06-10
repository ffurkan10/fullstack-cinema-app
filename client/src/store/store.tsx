import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import movieReducer from "../features/movie/movieSlice";
import layoutReducer from "../features/layout/layoutSlice";
import favoriteReducer from "../features/favorite/favoriteSlice";
import modalReducer from "../features/modal/modalSlice";
import theaterReducer from "../features/theater/theaterSlice";
import seatReducer from "../features/seat/seatSlice";
import matchReducer from "../features/match/matchSlice";
import menuReducer from "../features/menu/menuSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
    layout: layoutReducer,
    favorite: favoriteReducer,
    modal: modalReducer,
    theater: theaterReducer,
    seat: seatReducer,
    match: matchReducer,
    menu: menuReducer
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;