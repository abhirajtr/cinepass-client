import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const UserLayout = () => {    

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default UserLayout;


// import HeaderUser from "@/components/User/HeaderUser";
// import { PropsWithChildren } from "react"

// const UserLayout = ({ children }: PropsWithChildren) => {
//     return (
//         <div className="bg-gradient-to-br from-background to-muted">
//             <HeaderUser />
//             <main className="min-h-screen container mx-auto px-4 py-8">
//                 {children}hello
//             </main>
//             <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
//                 <div className="container mx-auto px-4 text-center text-gray-400">
//                     <p>Made with love by Abhi</p>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default UserLayout;