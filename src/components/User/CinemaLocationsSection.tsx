import React from 'react'
import { Card, CardContent } from "../../components/ui/card"
import { MapPin } from 'lucide-react'
import { Cinema } from '../../types/types'

interface CinemaLocationsSectionProps {
    cinemaLocations: Cinema[]
}

export const CinemaLocationsSection: React.FC<CinemaLocationsSectionProps> = ({ cinemaLocations }) => {
    return (
        <section className="py-12 px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-6">Cinema Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cinemaLocations.map((cinema) => (
                    <Card key={cinema.id} className="bg-gray-800">
                        <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">{cinema.name}</h3>
                            <p className="text-sm text-gray-400 flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {cinema.address}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}