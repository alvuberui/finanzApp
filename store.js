import { configureStore } from '@reduxjs/toolkit';
import authSlice from './app/slices/authSlice';

const store = configureStore({
  reducer: {
    authSlice: authSlice, // Utiliza el reducer del slice de autenticación
  },
});

export default store;