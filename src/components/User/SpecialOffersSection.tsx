import React from 'react'
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

export const SpecialOffersSection: React.FC = () => {
    return (
        <section className="py-12 px-4 md:px-8 bg-gradient-to-r from-purple-900 to-indigo-900">
            <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
            <Card className="bg-gray-800 p-6">
                <CardContent className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Weekend Special: 20% Off</h3>
                        <p className="text-gray-400 mb-4">Use code WEEKEND20 at checkout</p>
                        <Button>Claim Offer</Button>
                    </div>
                    <img src="/placeholder.svg?height=150&width=150" alt="Special Offer" className="w-32 h-32 object-cover rounded-full mt-4 md:mt-0" />
                </CardContent>
            </Card>
        </section>
    )
}