import { createSlice} from "@reduxjs/toolkit";
import db from '../../db'


interface Item {
    id: number,
    title: string,
    price: number,
    category: string,
    new: boolean,
    featured: boolean,
    img: string,
    description: string,
}

const initialState: Array<Item> = [];

export const itemSlicer = createSlice({
    name: "item",
    initialState,
    reducers: {
        getItems: () => {
            return db.item
        }
    }
})

export const {getItems } = itemSlicer.actions
export default itemSlicer.reducer