import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const withAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const [loading, setLoading] = useState(true);
        const router = useRouter();
        const isLogged = useSelector((state) => state.auth.isLogged);

        useEffect(() => {
            const checkAuth = async () => {
                setLoading(true);
                if (!isLogged) {
                    router.push("/"); 
                }
                setLoading(false);
            };

            checkAuth();
        }, [isLogged, router]);

        if (loading) {
            return (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <LoadingSpinner/>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
