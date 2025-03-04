import { configureStore } from "@reduxjs/toolkit";
import  cartSlice  from "./slice/cartSlice";
import categorySlicer  from "./slice/categorySlice";
import  itemSlicer  from "./slice/itemList";
import finisheSlicer from "./slice/finishesSlice"

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        category: categorySlicer,
        item: itemSlicer,
        finishe: finisheSlicer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch