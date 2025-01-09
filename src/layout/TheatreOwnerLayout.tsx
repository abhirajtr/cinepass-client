import { SidebarProvider } from '../components/ui/sidebar'
import SidebarTheatreOwner from './components/SidebarTheatreOwner'
import NavbarTheatreOwner from './components/NavbarTheatreOwner'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useEffect } from 'react'
import { logout } from '../feature/authSlice'

const TheatreOwnerLayout= () => {

    const { theatreOwnerToken } = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         await axios.post(`${backendUrl}/theatreOwner/logout`, {}, { withCredentials: true });
    //         dispatch(logout('theatreOwner'));
    //         // navigate("/theatreOwner/login");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const handleLogout = () => {
        dispatch(logout('theatreOwner'));
    }

    useEffect(() => {
        if (!theatreOwnerToken) {
            navigate("/theatreOwner/login");
        }
    }, [theatreOwnerToken, navigate]);

    if (!theatreOwnerToken) return null;


    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background container">
                <SidebarTheatreOwner />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <NavbarTheatreOwner logout={handleLogout} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default TheatreOwnerLayout;