import { configureStore, MiddlewareAPI } from "@reduxjs/toolkit";
import  cartSlice  from "./slice/cartSlice";
import categorySlicer  from "./slice/categorySlice";
import  itemSlicer  from "./slice/itemList";
import finishSlicer from "./slice/finishesSlice"

const localStorageMiddleware = (storeAPI: MiddlewareAPI) => (next:any) => (action:any) => {
    const result = next(action);
    if (action.type.startsWith("cart/")) {
      const cart = storeAPI.getState().cart;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return result;
  };

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        category: categorySlicer,
        item: itemSlicer,
        finish: finishSlicer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch