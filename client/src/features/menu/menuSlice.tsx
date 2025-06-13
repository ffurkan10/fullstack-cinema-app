import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MenuProps, MenuState } from "../../interfaces/menuTypes";
import { setResultModalData, showModal } from "../modal/modalSlice";

const initialState: MenuState = {
    selectedMenu: null,
    menuList: [] as MenuProps[],
    isLoading: false,
    isError: false,
}

export const createMenu = createAsyncThunk( "menu/createMenu", async ( body : any, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }

      const { data } = await axios.post(`http://13.61.141.182:5000/api/cinema/v1/menus/`, body , config);
        console.log(data);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde oluşturuldu."}));
        }
        
        return data.data.menuItem;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const getAllMenus = createAsyncThunk( "menu/getAllMenus", async ( _, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }

      const { data } = await axios.get(`http://13.61.141.182:5000/api/cinema/v1/menus/` , config);
        console.log(data);
        
        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const updateMenu = createAsyncThunk( "menu/updateMenu", async ( {id, body}: {id: string, body:any}, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }

      const { data } = await axios.patch(`http://13.61.141.182:5000/api/cinema/v1/menus/${id}`, body , config);

        if(data.status === "success"){
            thunkAPI.dispatch(showModal("result"));
            thunkAPI.dispatch(setResultModalData({resultType: "success", message: "Başarılı bir şekilde güncellendi."}));
        }
        
        return data.data.menuItem;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})

export const deleteMenu = createAsyncThunk( "menu/deleteMenu", async ( id: string, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }

      const { data } = await axios.delete(`http://13.61.141.182:5000/api/cinema/v1/menus/${id}` , config);

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

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    
    setSelectedMenu: (state, action: PayloadAction<MenuProps>) => {
        state.selectedMenu = action.payload;
    },

    addMenutoCart: (state, action: PayloadAction<MenuProps>) => {
        const menu = action.payload;
        const existingMenu = state.menuList.find(item => item._id === menu._id);

        if (existingMenu) {
            state.menuList = state.menuList.map(item =>
            item._id === menu._id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
            );
        } else {
            console.log("Adding new menu with quantity 1");
            state.menuList.push({ ...menu, quantity: 1 });
        }

    },


    removeMenufromCart: (state, action: PayloadAction<MenuProps>) => {
    const menu = action.payload;
    const existingMenu = state.menuList.find(item => item._id === menu._id);

    if (existingMenu) {
        //? quantity 1'den büyükse azalt
        if (existingMenu.quantity && existingMenu.quantity > 0) {
        state.menuList = state.menuList.map(item =>
            item._id === menu._id
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) } //? 0'dan küçük olmasın
            : item
        );
        }
    }
    },


  },
  extraReducers: (builder) => {
    builder
    .addCase(createMenu.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(createMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action.payload", action.payload);
        
        state.menuList = [...state.menuList, action.payload];
        state.isError = false;
    })
    .addCase(createMenu.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })

    .addCase(getAllMenus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(getAllMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuList = action.payload.menuItems;
        state.isError = false;
    })
    .addCase(getAllMenus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })

    .addCase(updateMenu.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(updateMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuList = state.menuList.map((menu) => {
            if (menu._id === action.payload._id) {
                return action.payload;
            }
            return menu;
        });
        state.isError = false;
    })
    .addCase(updateMenu.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })

    .addCase(deleteMenu.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(deleteMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuList = state.menuList.filter((menu) => menu._id !== action.payload._id);
        state.isError = false;
    })
    .addCase(deleteMenu.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
    })
  }
});

export const { setSelectedMenu, removeMenufromCart, addMenutoCart } = menuSlice.actions;

export default menuSlice.reducer;