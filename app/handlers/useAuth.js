import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import { login, logout } from "../slices/authSlice";

export function useAuth() {
    const dispatch = useDispatch();

    const loginHandler = async (values) => {
      try {
        const response = await axios.post("/api/auth/signin", values);
        localStorage.setItem('isLogged', true);
        localStorage.setItem('user', response.data.user);
        dispatch(login(response.data.user));
        toast.success(response.data.message);
        return response.data.user;
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
  
    const logoutHandler = async () => {
      try {
        const response = await axios.get('/api/auth/logout');
        localStorage.clear();
        dispatch(logout());
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error("Algo ha salido mal. Por favor, inténtalo de nuevo");
      }
    };

    const signupHandler = async (values) => {
      try {
        console.log(values)
        const response = await axios.post("/api/auth/signup", values);
        localStorage.setItem('isLogged', true);
        localStorage.setItem('user', response.data.user);
        dispatch(login(response.data.user));
        toast.success(response.data.message);
        return true;
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
  
    return {
      login: loginHandler,
      logout: logoutHandler,
      signup: signupHandler
    };
  }
export default useAuth;
