import { createSlice } from '@reduxjs/toolkit';

const loadOrdersFromStorage = () => {
  try {
    const raw = localStorage.getItem('orders');
    if (!raw) return { lastOrder: null, history: [] };
    const parsed = JSON.parse(raw);
    return {
      lastOrder: parsed.lastOrder || null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return { lastOrder: null, history: [] };
  }
};

const saveOrdersToStorage = (state) => {
  try {
    const data = JSON.stringify({
      lastOrder: state.lastOrder,
      history: state.history,
    });
    localStorage.setItem('orders', data);
  } catch (err) {
    console.error('Failed to save orders to localStorage:', err);
  }
};

const initialState = loadOrdersFromStorage();

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const base = action.payload || {};
      const id = base.id || Date.now().toString();
      const order = {
        ...base,
        id,
        createdAt: base.createdAt || new Date().toISOString(),
      };
      state.lastOrder = order;
      state.history.unshift(order);
      saveOrdersToStorage(state);
    },
    clearLastOrder: (state) => {
      state.lastOrder = null;
      saveOrdersToStorage(state);
    },
  },
});

export const { createOrder, clearLastOrder } = ordersSlice.actions;
export default ordersSlice.reducer;

export const selectLastOrder = (state) => state.orders.lastOrder;
export const selectOrderHistory = (state) => state.orders.history;

