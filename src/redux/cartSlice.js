import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // Check if item already exists in cart with the same customization
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.customization === action.payload.customization
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
    },
    removeItem: (state, action) => {
      // action.payload is the unique cart item id (or index)
      state.items = state.items.filter((item) => item.cartItemId !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find((item) => item.cartItemId === cartItemId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
