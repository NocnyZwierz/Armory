import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
     let copy = [...state];
     copy.splice(action.payload,1);
     return copy;
    },
    updateItemsInCart: (state, action: PayloadAction<{ id: number; finish: string; quantity: number }>) => {
        state[action.payload.id].quantity = action.payload.quantity;
        state[action.payload.id].finish = action.payload.finish
    },
    updateFinish: (state, action: PayloadAction<{ id: number; oldFinish: string; newFinish: string }>) => {
      const index = state.findIndex(item => item.id === action.payload.id && item.finish === action.payload.oldFinish);
      if (index !== -1) {
        state[index].finish = action.payload.newFinish;
      }
    },
  },
});

export const { addToCart, removeProduct, updateFinish, updateItemsInCart } = cartSlicer.actions;
export default cartSlicer.reducer;
