import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Item {
  id: number;
  title: string;
  price: number;
  category: string;
  new: boolean;
  featured: boolean;
  img: string;
  description: string;
}

interface ItemsState {
  items: Item[];
  loading: boolean;
  error?: string;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Błąd podczas pobierania produktów");
  }
  return (await response.json()) as Item[];
});

export const itemSlicer = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default itemSlicer.reducer;
