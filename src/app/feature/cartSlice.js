import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.cart.push(payload);
    },
    incrementAmount: (state, { payload }) => {
      const item = state.cart.find((i) => i.id === payload);
      if (item) {
        item.amount += 1;
      }
    },
    decrementAmount: (state, { payload }) => {
      const item = state.cart.find((i) => i.id === payload);
      if (item) {
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          
          state.cart = state.cart.filter((i) => i.id !== payload);
        }
      }
    },
    
    clearCart: (state) => {
      state.cart = [];
    },
   
    deleteCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload);
    },
  },
});

export const {
  addToCart,
  incrementAmount,
  decrementAmount,
  clearCart,
  deleteCart,
} = cartSlice.actions;
// console.log(state.cart);
export default cartSlice.reducer;
