import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SeatState } from "../../interfaces/seatTypes";
import { ScreeningProps, SeatProps } from "../../interfaces/movieTypes";
import axios from "axios";
import { setResultModalData, showModal } from "../modal/modalSlice";

const initialState: SeatState = {
    selectedScreening: null,
    selectedSeatList: [],
    isLoading: false,
    isError: false,
}

export const updateSeats = createAsyncThunk( "theater/updateSeats", async ( body : any, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }

      const { data } = await axios.post(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/screenings/seats`, body , config);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", link:"/" , message: "Satın alma işlemi başarılı, iyi seyirler dileriz :)"}));
        }
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

const seatSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {
    setSelectedSeatList: (state, action: PayloadAction<SeatProps>) => {

        const seatExists = state.selectedSeatList.some((item) => item._id === action.payload._id);
        
        if (seatExists) {
            state.selectedSeatList = state.selectedSeatList.filter((item) => item._id !== action.payload._id);
        } else {
            state.selectedSeatList = [...state.selectedSeatList, action.payload];
        }
    },

    clearSelectedSeatList: (state) => {
        state.selectedSeatList = [];
    },

    setSelectedScreening: (state, action: PayloadAction<ScreeningProps | null>) => {
        state.selectedScreening = action.payload;
    }

  },
//   extraReducers: (builder) => {
//     builder
    
//   }
});

export const { setSelectedSeatList, setSelectedScreening, clearSelectedSeatList } = seatSlice.actions;

export default seatSlice.reducer;