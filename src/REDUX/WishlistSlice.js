import { createSlice } from '@reduxjs/toolkit';


const loadWishlistFromStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem('wishlist');
    if (serializedWishlist === null) {
      return [];
    }
    return JSON.parse(serializedWishlist);
  } catch (err) {
    return [];
  }
};


const saveWishlistToStorage = (wishlist) => {
  try {
    const serializedWishlist = JSON.stringify(wishlist);
    localStorage.setItem('wishlist', serializedWishlist);
  } catch (err) {
    console.error('Failed to save wishlist to localStorage:', err);
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const { id, title, price, img } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        state.items.push({
          id,
          title,
          price: parseFloat(price) || 0,
          img,
        });
      }
      
      saveWishlistToStorage(state.items);
    },
    addToWishlist: (state, action) => {
      const { id, title, price, img } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (!existingItem) {
        state.items.push({
          id,
          title,
          price: parseFloat(price) || 0,
          img,
        });
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;


export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (state, productId) => 
  state.wishlist.items.some(item => item.id === productId);

