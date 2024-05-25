import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { login, logout } from "../slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch();

  const loginHandler = async (values) => {
    try {
      const response = await axios.post("/api/auth/signin", values);
      localStorage.setItem("isLogged", true);
      localStorage.setItem("user", response.data.user);
      dispatch(login(response.data.user));
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
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
      console.log(values);
      const response = await axios.post("/api/auth/signup", values);
      localStorage.setItem("isLogged", true);
      localStorage.setItem("user", response.data.user);
      dispatch(login(response.data.user));
      toast.success(response.data.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const deleteAccountHandler = async () => {
    try {
      const response = await axios.delete("/api/auth/user");
      localStorage.clear();
      dispatch(logout());
      return response.data.message;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const updateAccountHandler = async (values) => {
    try {
      const response = await axios.put("/api/auth/user", values);
      localStorage.setItem("user", response.data.data);
      dispatch(login(response.data.data));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const getDataFromToken = async () => {
    try {
      const response = await axios.get("/api/auth/user");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const changePasswordHandler = async (values) => {
    try {
      const response = await axios.patch("/api/auth/user", values);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return {
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
    deleteAccount: deleteAccountHandler,
    updateAccount: updateAccountHandler,
    getDataFromToken,
    changePassword: changePasswordHandler,
  };
}
export default useAuth;
