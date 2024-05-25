import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
 name: 'authSlice',
 initialState: {
 isLogged: typeof window !== "undefined" ? window.localStorage.getItem('isLogged') ? true : false : null,
 user: typeof window !== "undefined" ? window.localStorage.getItem('user') : {} ,
},
 reducers: {
 login: (state, user ) => {
    state.isLogged = true;
    state.user = user
 },
 logout: (state) => {
    state.isLogged = false;
    state.user = {}
 }
 }});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;