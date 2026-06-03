import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 999 ? 0 : 99;
  const totalPrice = subtotal + tax + shipping;
  return { totalItems, subtotal, tax, shipping, totalPrice };
};

const initialState = {
  cartItems: loadCartFromStorage(),
  ...calculateTotals(loadCartFromStorage()),
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress') || 'null'),
  paymentMethod: 'COD',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + 1, item.stock);
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      const totals = calculateTotals(state.cartItems);
      Object.assign(state, totals);
      saveCartToStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      const totals = calculateTotals(state.cartItems);
      Object.assign(state, totals);
      saveCartToStorage(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i._id === id);
      if (item) {
        item.quantity = Math.max(1, Math.min(quantity, item.stock));
      }
      const totals = calculateTotals(state.cartItems);
      Object.assign(state, totals);
      saveCartToStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      const totals = calculateTotals([]);
      Object.assign(state, totals);
      saveCartToStorage([]);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  saveShippingAddress,
  setPaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
