
const Footer = () => {
    return (
        <div className="text-white bg-bg-dark-secondary/30 backdrop-blur-lg">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-5">

                <div>
                    {/* <img src={assets.logo1} className="mb-5 w-32" alt="" /> */}
                    <p className="mb-5 text-xl font-bold text-dark-purple">
                        CinePass
                    </p>
                    <p className="w-full md:w-2/3 text-gray-600">
                        Book your tickets with CinePass and enjoy the latest blockbuster movies at your nearest theatre.
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">EXPLORE</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>Movies</li>
                        <li>Theatres</li>
                        <li>Book Tickets</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+91 98765 43210</li>
                        <li>support@cinepass.com</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr className="border-light-purple" />
                <p className="py-5 text-sm text-center">© 2024 CinePass. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
