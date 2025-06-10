import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  activeSelect: string | null; 
  isOpenAccount: boolean;
}

const initialState: LayoutState = {
  //! seçili input name
  activeSelect: "",

  //! hesap bilgileri açılıp kapanması
  isOpenAccount: false,

};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setActiveSelect: (state, action: PayloadAction<string>) => {
      state.activeSelect = action.payload;
    },
    setIsOpenAccount: (state, action: PayloadAction<boolean>) => {
      state.isOpenAccount = action.payload;
    }
  },
});

export const { setActiveSelect, setIsOpenAccount } = layoutSlice.actions;

export default layoutSlice.reducer;
