import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AddMovieProps, MovieState, PatchMovieProps } from "../../interfaces/movieTypes";
import { setResultModalData, showModal } from "../modal/modalSlice";

const initialState: MovieState = {
    movieList: [],

    selectedMovie: null,
    isLoading: false,
    isError: false,
}

export const getAllMovies = createAsyncThunk( "movie/getAllMovies", async (_ , thunkAPI) => {
    try {
      const { data } = await axios.get(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/movies/`);
        
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const getMovieBySlug = createAsyncThunk( "movie/getMovieBySlug", async (slug: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/movies/slug/${slug}`);
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const updateMovie = createAsyncThunk( "movie/updateMovie", async ({movieId, body} : {movieId: string, body: PatchMovieProps }, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        
        const { data } = await axios.patch(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/movies/${movieId}`, body, config);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde güncellendi."}));
        }
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})


export const addMovie = createAsyncThunk( "movie/addMovie", async ( body: AddMovieProps , thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        
        const { data } = await axios.post(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/movies/`, body, config);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde eklendi."}));
        }
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const deleteMovie = createAsyncThunk( "movie/deleteMovie", async ( movieId: string, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };
        
        const { data } = await axios.delete(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/movies/${movieId}`, config);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde silindi."}));
        }
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})


const movileSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {

    setSelectedMovie: (state, action: PayloadAction<any>) => {
        state.selectedMovie = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
    //! getAllMovies
    .addCase(getAllMovies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieList = action.payload.data.movies;
        state.isError = false;
    })
    .addCase(getAllMovies.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    //! getMovieBySlug
    .addCase(getMovieBySlug.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getMovieBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedMovie = action.payload.movie;
        state.isError = false;
    })
    .addCase(getMovieBySlug.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })

    //! updateMovie
    .addCase(updateMovie.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(updateMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieList = state.movieList?.map((item) => {
            if(item._id === action.payload._id){
                return action.payload;
            }else{
                return item;
            }
        })
        state.selectedMovie = action.payload.movie
        state.isError = false;
    })
    .addCase(updateMovie.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    //! addMovie
    
    .addCase(addMovie.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(addMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieList = [...state.movieList, action.payload.movie];
        state.isError = false;
    })
    .addCase(addMovie.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
    //! deleteMovie
    
     .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieList = state.movieList?.filter((item) => item._id !== action.payload._id);
        state.isError = false;
    })
    .addCase(deleteMovie.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
  }
});

export const { setSelectedMovie } = movileSlice.actions;

export default movileSlice.reducer;
