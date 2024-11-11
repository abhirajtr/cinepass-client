import { useDispatch } from "react-redux";
import Sidebar from "./components/TheatreOwner/Sidebar";
import { AppDispatch } from "./store";
import { useNavigate } from "react-router-dom";
import { logout } from "./feature/authSlice";

const TheatreOwnerLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(logout());
        navigate("/login");
    }
    return (
        <div className="min-h-[100vh] bg-grey-10 text-white flex flex-col">
            <Sidebar logout={handleLogout} />
        </div>
    )
}

export default TheatreOwnerLayout
