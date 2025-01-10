import React from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 px-4 md:px-8">
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h3 className="text-xl font-bold mb-4">CinePass</h3>
                    <p>Your ultimate movie ticket booking app.</p>
                </div>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">FAQs</a></li>
                        <li><a href="#" className="hover:text-white">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3">
                    <h4 className="font-semibold mb-4">Stay Connected</h4>
                    <Input type="email" placeholder="Enter your email" className="mb-2" />
                    <Button>Subscribe</Button>
                </div>
            </div>
            <div className="mt-8 text-center">
                <p>&copy; 2024 CinePass. All rights reserved.</p>
            </div>
        </footer>
    )
}