import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MatchState } from "../../interfaces/matchTypes";
import { setResultModalData, showModal } from "../modal/modalSlice";

const initialState: MatchState = {
    matchList: [],
    isLoading: false,
    isError: false,
}

export const getAllMatches = createAsyncThunk( "match/getAllMatches", async (_ , thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/cinema/v1/matches/`);
        
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const createMatch = createAsyncThunk( "match/createMatch", async (body: any , thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.post(`/api/cinema/v1/matches/`, body, config);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde oluşturuldu."}));
        }
        
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})


export const removeMatch = createAsyncThunk( "match/remove", async ({id, movieId}: {id: string, movieId: string} , thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.delete(`/api/cinema/v1/matches/removeMatch/${id}/${movieId}`, config);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde kaldırıldı."}));
        }
        
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllMatches.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getAllMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matchList = action.payload.data.matches;
        state.isError = false;
    })
    .addCase(getAllMatches.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
   
    .addCase(createMatch.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(createMatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matchList = [...state.matchList, action.payload.data.newMatch];
        state.isError = false;
    })
    .addCase(createMatch.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })

    .addCase(removeMatch.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(removeMatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matchList = state.matchList.filter((item) => item._id !== action.payload.data.match._id);
        state.isError = false;
    })
    .addCase(removeMatch.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
  }
});

export const {  } = matchSlice.actions;

export default matchSlice.reducer;