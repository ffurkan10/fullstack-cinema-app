import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { theaterTypes } from "../../interfaces/theaterTypes";

const initialState: theaterTypes = {
    theaterList: [],

    isLoading: false,
    isError: false,
}

export const getAllTheaters = createAsyncThunk( "theater/getAllTheaters", async (_ , thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }

      const { data } = await axios.get(`http://13.61.141.182:5000/api/cinema/v1/theaters/`, config);
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    
     .addCase(getAllTheaters.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getAllTheaters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.theaterList = action.payload.theaters;
        state.isError = false;
    })
    .addCase(getAllTheaters.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
  }
});

export const {  } = theaterSlice.actions;

export default theaterSlice.reducer;