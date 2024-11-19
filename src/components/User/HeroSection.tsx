import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Calendar, Ticket } from 'lucide-react'
import { Movie } from '@/types/types'

interface HeroSectionProps {
    featuredMovie: Movie & { duration: string; releaseDate: string; rating: number; }
}

export const HeroSection: React.FC<HeroSectionProps> = ({ featuredMovie }) => {
    return (
        <section className="relative h-[70vh] overflow-hidden">
            <img src={featuredMovie.image} alt={featuredMovie.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3 lg:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{featuredMovie.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="secondary" className="text-sm">
                        <Star className="w-4 h-4 mr-1" />
                        {featuredMovie.rating}
                    </Badge>
                    <span className="text-sm"><Clock className="w-4 h-4 inline mr-1" />{featuredMovie.duration}</span>
                    <span className="text-sm"><Calendar className="w-4 h-4 inline mr-1" />{featuredMovie.releaseDate}</span>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <Ticket className="w-4 h-4 mr-2" />
                    Book Now
                </Button>
            </div>
        </section>
    )
}