import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

const useRoleRedirect = () => {
    const navigate = useNavigate();

    // Select authentication states and roles from the Redux store
    const { isAuthenticatedAdmin, isAuthenticatedUser, isAuthenticatedTheaterOwner } = useSelector(
        (state: RootState) => state.authReducer
    );
    console.log("admin",isAuthenticatedAdmin);
    console.log("user",isAuthenticatedUser);
    console.log("theatreOwner",isAuthenticatedTheaterOwner);
    

    useEffect(() => {
        // Redirect based on the authentication state and role
        if (isAuthenticatedAdmin) {
            console.log("redirecting to admin");
            
            navigate("/admin/users");
        } else if (isAuthenticatedUser) {
            console.log("redirecting to user");
            navigate("/");
        } else if (isAuthenticatedTheaterOwner) {
            console.log("redirecting to thetreOwner");
            navigate("/theater/theatres");
        }
    }, [isAuthenticatedAdmin, isAuthenticatedUser, isAuthenticatedTheaterOwner, navigate]);
};

export default useRoleRedirect;
