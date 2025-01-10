import React from 'react'
import { Button } from "../../components/ui/button"
import { Play } from 'lucide-react'
import { Movie } from '../../types/types'

interface WatchlistSectionProps {
    watchlist: Movie[]
}

export const WatchlistSection: React.FC<WatchlistSectionProps> = ({ watchlist }) => {
    return (
        <section className="py-12 px-4 md:px-8 bg-gray-800">
            <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {watchlist.map((movie) => (
                    <div key={movie.id} className="flex-shrink-0 w-32">
                        <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover rounded-md mb-2" />
                        <p className="text-sm font-medium truncate">{movie.title}</p>
                    </div>
                ))}
                <div className="flex-shrink-0 w-32 flex items-center justify-center">
                    <Button variant="outline" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        See All
                    </Button>
                </div>
            </div>
        </section>
    )
}