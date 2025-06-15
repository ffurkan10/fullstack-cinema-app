import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, LoginRequest, RegisterRequest, UserPayload } from "../../interfaces/authTypes";
import {jwtDecode} from 'jwt-decode'

const initialState: AuthState = {
    user: null,

    isLoading: false,
    isError: false,
    isLoadingRegister: false,
    isErrorRegister: false,
}

export const register = createAsyncThunk( "auth/register", async (body: RegisterRequest, thunkAPI) => {
    try {
      const { data } = await axios.post("https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/users/signup", body);

        if(data.status === "success"){
            const payload = jwtDecode<UserPayload>(data.token)
            localStorage.setItem("token", data.token);
            localStorage.setItem('userId', payload.id)
            localStorage.setItem('userRole', payload.role)
            window.location.href = "/"
        }

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);

export const login = createAsyncThunk( "auth/login", async (body: LoginRequest, thunkAPI) => {
    try {
      const { data } = await axios.post("https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/users/login", body);

        if(data.status === "success"){
            const payload = jwtDecode<UserPayload>(data.token)
            localStorage.setItem("token", data.token);
            localStorage.setItem('userId', payload.id)
            localStorage.setItem('userRole', payload.role)
            window.location.href = "/"
        }

        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const getUserInformation = createAsyncThunk( "auth/userInformation", async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`https://fullstack-cinema-app-1.onrender.com/api/cinema/v1/users/${id}`);
        
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    logout: (state) => {
        state.user = null;
        localStorage.clear()
        window.location.reload()
    }
    
  },
  extraReducers: (builder) => {
    builder
    //! register
    .addCase(register.pending, (state) => {
        state.isLoadingRegister = true;
        state.isErrorRegister = false;
    })
    .addCase(register.fulfilled, (state) => {
        state.isLoadingRegister = false;
        state.isErrorRegister = false;
    })
    .addCase(register.rejected, (state) => {
        state.isLoadingRegister = false;
        state.isErrorRegister = true;
    })
    //! login
    .addCase(login.pending, (state) => {
        state.isLoadingRegister = true;
        state.isErrorRegister = false;
    })
    .addCase(login.fulfilled, (state) => {
        state.isLoadingRegister = false;
        state.isErrorRegister = false;
    })
    .addCase(login.rejected, (state) => {
        state.isLoadingRegister = false;
        state.isErrorRegister = true;
    })
    //! getUserInformation
    .addCase(getUserInformation.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getUserInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user
        state.isError = false;
    })
    .addCase(getUserInformation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
