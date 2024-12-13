import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">About</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/about" className="text-base text-muted-foreground hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-base text-muted-foreground hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/press" className="text-base text-muted-foreground hover:text-foreground">
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/faq" className="text-base text-muted-foreground hover:text-foreground">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-base text-muted-foreground hover:text-foreground">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/help" className="text-base text-muted-foreground hover:text-foreground">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/privacy" className="text-base text-muted-foreground hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-base text-muted-foreground hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Newsletter</h3>
                        <p className="mt-4 text-base text-muted-foreground">
                            Subscribe to get updates on new releases and special offers.
                        </p>
                        <form className="mt-4 sm:flex sm:max-w-md">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
                                required
                                className="appearance-none min-w-0 w-full bg-background border border-input rounded-md shadow-sm py-2 px-4 text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter your email"
                            />
                            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-primary-foreground rounded-md py-2 px-4 flex items-center justify-center text-base font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-muted pt-8">
                    <p className="text-base text-muted-foreground text-center">&copy; 2023 CinePass. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

