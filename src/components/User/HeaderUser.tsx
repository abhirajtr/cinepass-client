import { Link } from "react-router-dom"

const HeaderUser = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/">
                    <span className="text-3xl font-bold">CinePass</span>
                </Link>
            </div>
            <div>

            </div>
        </header>
    )
}

export default HeaderUser