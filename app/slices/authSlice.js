import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
   name: 'authSlice',
   initialState: {
      isLogged: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
      token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
      user: typeof window !== "undefined" ? localStorage.getItem("user") : null,
   },
   reducers: {
      login: (state, action) => {
         state.isLogged = true;
         state.token = action.payload.token;
         state.user = action.payload.user;
         localStorage.setItem("token", action.payload.token);
         localStorage.setItem("user", action.payload.user);
      },
      logout: (state) => {
         state.isLogged = false;
         state.token = null;
         state.user = null;
         localStorage.removeItem("token");
         localStorage.removeItem("user");
      },
   }
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;