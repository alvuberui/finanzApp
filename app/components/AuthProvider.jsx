import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {
            dispatch(login({ token, user }));
        }
    }, [dispatch]);

    return children;
};

export default AuthProvider;
