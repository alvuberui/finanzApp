import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const withGuest = (WrappedComponent) => {
    const GuestComponent = (props) => {
        const router = useRouter();
        const isLogged = useSelector((state) => state.auth.isLogged);
        const [loading, setLoading] = useState(true); 

        useEffect(() => {
            const checkAuth = async () => {
                setLoading(true);

                if (isLogged) {
                    router.push("/home"); 
                }

                setLoading(false);
            };

            checkAuth();
        }, [isLogged, router]);

        if (loading) {
            return (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <LoadingSpinner />
                </div>
            );
        }

        if (isLogged) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return GuestComponent;
};

export default withGuest;
