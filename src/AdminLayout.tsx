// import Navbar from "./components/Admin/Navbar";
import Sidebar from "./components/Admin/Sidebar";

const AdminLayout = () => {
    return (
        <div className="min-h-[100vh] bg-grey-10 text-white flex flex-col">
            {/* <Navbar/> */}
            <Sidebar />
        </div>
        // <div className="bg-bg-dark min-h-[100vh]">
        //     <Navbar />
        //     <div className="bg-background px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        //         <Outlet />
        //     </div>
        //     <Footer />
        // </div>
    )
}

export default AdminLayout