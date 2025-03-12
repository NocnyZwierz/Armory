import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Category {
  id: number;
  title: string;
  img: string;
}

interface CategoryState {
  category: Category[];
  loading: boolean;
  error?: string;
}

const initialState: CategoryState = {
  category: [],
  loading: false,
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await fetch("api/categories");
    if (!response.ok) {
      throw new Error("Błąd podczas pobierania kategorii");
    }
    return (await response.json()) as Category[];
  }
);

export const categorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlicer.reducer