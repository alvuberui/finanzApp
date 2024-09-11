import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login, logout } from "../slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch();

  const router = useRouter();

  const loginHandler = async (values, setIsLoading) => {
    try {
      const response = await axios.post("/api/auth/signin", values);
      localStorage.setItem("isLogged", true);
      localStorage.setItem("user", response.data.user);
      dispatch(login(response.data.user));
      setIsLoading(false);
      router.push('/home');
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const logoutHandler = async (setIsLoading) => {
    try {
      const response = await axios.get("/api/auth/logout");
      localStorage.clear();
      dispatch(logout());
      setIsLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo ha salido mal. Por favor, inténtalo de nuevo");
    }
  };

  const signupHandler = async (values, setIsLoading) => {
    try {
      const response = await axios.post("/api/auth/signup", values);
      localStorage.setItem("isLogged", true);
      localStorage.setItem("user", response.data.user);
      dispatch(login(response.data.user));
      setIsLoading(false);
      toast.success(response.data.message);
      router.push('/home');
      return true;
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const deleteAccountHandler = async (setIsLoaded) => {
    try {
      const response = await axios.delete("/api/auth/user");
      localStorage.clear();
      dispatch(logout());
      setIsLoaded(false);
      return response.data.message;
    } catch (error) {
      setIsLoaded(false);
      toast.error(error.response.data.error);
    }
  };

  const updateAccountHandler = async (values, setIsLoaded) => {
    try {
      const response = await axios.put("/api/auth/user", values);
      localStorage.setItem("user", response.data.data);
      dispatch(login(response.data.data));
      toast.success(response.data.message);
      setIsLoaded(false);
      return response.data.data;
    } catch (error) {
      setIsLoaded(false);
      toast.error(error.response.data.error);
    }
  };

  const getDataFromToken = async (setIsLoaded) => {
    try {
      const response = await axios.get("/api/auth/user");
      setIsLoaded(false);
      return response.data.data;
    } catch (error) {
      setIsLoaded(false);
      toast.error(error.response.data.error);
    }
  };

  const changePasswordHandler = async (values, setIsLoading) => {
    try {
      const response = await axios.patch("/api/auth/user", values);
      setIsLoading(false);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      setIsLoading(false);
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
