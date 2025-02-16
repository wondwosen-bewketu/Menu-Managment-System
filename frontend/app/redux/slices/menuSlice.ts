import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { menuApi } from "../../api";

interface MenuItem {
  depth: number;
  id: string;
  name: string;
  parentId?: string;
  children?: MenuItem[];
}

interface MenuState {
  menus: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: null,
};

// Async Thunks using API Service
export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  return menuApi.fetchMenus();
});

export const fetchParents = createAsyncThunk(
  "menu/fetchParents",
  async () => {
    return menuApi.fetchParents();
  }
);

export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (menuData: { name: string; parentId?: string }) => {
    return menuApi.addMenu(menuData);
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (id: string) => {
    return menuApi.deleteMenu(id);
  }
);

// Slice
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMenus.fulfilled,
        (state, action: PayloadAction<MenuItem[]>) => {
          state.menus = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menus";
      })
      .addCase(addMenu.fulfilled, (state, action: PayloadAction<MenuItem>) => {
        state.menus.push(action.payload);
      })
      .addCase(deleteMenu.fulfilled, (state, action: PayloadAction<string>) => {
        state.menus = state.menus.filter((menu) => menu.id !== action.payload);
      });
  },
});

export default menuSlice.reducer;
