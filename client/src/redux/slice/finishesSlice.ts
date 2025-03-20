import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Finish {
  id: number;
  title: string;
}

interface FinishState {
  finish: Finish[],
  loading: boolean,
  error?: string;
}

const initialState: FinishState = {
  finish: [],
  loading: false,
};

export const fetchFinish = createAsyncThunk(
  "finish/fetchFinish",
  async () => {
    const response = await fetch("/api/finishes");
    if (!response.ok) {
      throw new Error("Błąd podczas pobierania wykończeń powierzchni");
    }
    const responsJson = (await response.json())
    return responsJson  as Finish[];
  }
)

export const finishSlicer = createSlice({
  name: "finish",
  initialState,
  reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchFinish.pending, (state) => {
            state.loading = true;
            state.error = undefined;
          })
          .addCase(fetchFinish.fulfilled, (state, action) => {
            state.loading = false;
            state.finish = action.payload;
          })
          .addCase(fetchFinish.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
});

export default finishSlicer.reducer
