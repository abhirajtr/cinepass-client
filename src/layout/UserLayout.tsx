import HeaderUser from "@/components/User/HeaderUser";
import type { PropsWithChildren } from "react"

const UserLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            <HeaderUser />
            <main className="min-h-screen container mx-auto px-4 py-8">
                {children} Hello
            </main>
            <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>Made with love by Abhi</p>
                </div>
            </footer>
        </div>
    )
}

export default UserLayout;