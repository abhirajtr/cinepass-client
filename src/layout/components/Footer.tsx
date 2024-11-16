const Footer = () => {
    return (
        <footer className="border-t">
            <div className="container flex flex-col gap-2 py-6 md:flex-row md:gap-4 md:py-8 px-6">
                <p className="text-xs text-gray-500 md:text-sm">© 2024 MovieTix. All rights reserved.</p>
                <nav className="flex gap-4 sm:ml-auto sm:gap-6">
                    <a className="text-xs hover:underline underline-offset-4 md:text-sm" href="#">
                        Terms of Service
                    </a>
                    <a className="text-xs hover:underline underline-offset-4 md:text-sm" href="#">
                        Privacy
                    </a>
                    <a className="text-xs hover:underline underline-offset-4 md:text-sm" href="#">
                        Contact
                    </a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;