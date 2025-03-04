import { createSlice } from "@reduxjs/toolkit";
import db from "../../db";

interface Finish {
  id: number;
  title: string;
}

const initialState: Array<Finish> = [];

export const categorySlicer = createSlice({
  name: "finishe",
  initialState,
  reducers: {
    getFinishe: () => {
      return db.finishes;
    },
  },
});

export const { getFinishe } = categorySlicer.actions;
export default categorySlicer.reducer;
