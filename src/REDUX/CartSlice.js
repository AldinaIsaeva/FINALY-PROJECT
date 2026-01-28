import { createSlice } from '@reduxjs/toolkit';


const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return [];
  }
};


const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Failed to save cart to localStorage:', err);
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, img } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({
          id,
          title,
          price: parseFloat(price) || 0,
          img,
          qty: 1,
        });
      }
      
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    increaseQty: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.qty += 1;
        saveCartToStorage(state.items);
      }
    },
    decreaseQty: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.qty === 1) {
          state.items = state.items.filter(i => i.id !== action.payload);
        } else {
          item.qty -= 1;
        }
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, item) => sum + item.qty, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((sum, item) => sum + (item.price * item.qty), 0);

