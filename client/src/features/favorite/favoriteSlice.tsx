import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FavoriteState } from "../../interfaces/movieTypes";

const initialState: FavoriteState = {
    favoriteList: null,

    isLoading: false,
    isError: false,
}

export const getAllFavorites = createAsyncThunk( "favorites/getAllFavorites", async (_ , thunkAPI) => {
    try {

        const token = localStorage.getItem("token");
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

      const { data } = await axios.get(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/favorites/`, config);
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const addFavorite = createAsyncThunk( "favorites/addFavorite", async (movieId: string, thunkAPI) => {
    try {

        const token = localStorage.getItem("token");
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

      const { data } = await axios.post(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/favorites/${movieId}`,"", config);
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const removeFavorite = createAsyncThunk( "favorites/remove", async (movieId: string, thunkAPI) => {
    try {

        const token = localStorage.getItem("token");
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

      const { data } = await axios.delete(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/favorites/${movieId}`, config);
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})


const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {

    
  },
  extraReducers: (builder) => {
    builder
    //! getAllFavorites
    .addCase(getAllFavorites.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getAllFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteList = action.payload.favorites;
        state.isError = false;
    })
    .addCase(getAllFavorites.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    //! addFavorite
    .addCase(addFavorite.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(addFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteList = action.payload.favorites;
        state.isError = false;
    })
    .addCase(addFavorite.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    //! removeFavorite
    .addCase(removeFavorite.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(removeFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
         state.favoriteList = action.payload.favorites;
        state.isError = false;
    })
    .addCase(removeFavorite.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
  }
});

export const {  } = favoriteSlice.actions;

export default favoriteSlice.reducer;
