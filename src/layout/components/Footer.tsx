import { Facebook, Twitter, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-secondary py-8 px-6">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-4">MovieTickets</h3>
                        <p className="text-sm text-muted-foreground">Your one-stop destination for movie tickets and more.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <Link to="#" className="text-muted-foreground hover:text-foreground">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link to="#" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link to="#" className="text-muted-foreground hover:text-foreground">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center">
                    <p className="text-sm text-muted-foreground">&copy; 2024 MovieTickets. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}


export default Footer;
