import { createSlice, isAction, PayloadAction } from "@reduxjs/toolkit";

interface Products {
  id: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
}

interface CartItem extends Products {
  finish: string;
}

const initialState: Array<CartItem> = [];

export const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.findIndex(
        product => product.id === action.payload.id && product.finish === action.payload.finish
      );
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index].quantity += action.payload.quantity;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateItemsInCart: (state, action: PayloadAction<{id: number; finish: string; quantity: number}>) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index].finish = action.payload.finish;
        state[index].quantity = action.payload.quantity;
      }
    },
    updateFinish: (state, action: PayloadAction<{ id: number; finish: string }>) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index].finish = action.payload.finish;
      }
    },
  },
});

export const { addToCart, removeProduct, updateFinish, updateItemsInCart } = cartSlicer.actions;
export default cartSlicer.reducer;
