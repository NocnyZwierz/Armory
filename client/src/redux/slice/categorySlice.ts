import { createSlice} from "@reduxjs/toolkit";
import db from '../../db'


interface Category {
    id: number,
    title: string,
    img: string,
}

const initialState: Array<Category> = [];

export const categorySlicer = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategory: () => {
            return db.category;
          }
    }
})

export const { getCategory } = categorySlicer.actions;
export default categorySlicer.reducer;