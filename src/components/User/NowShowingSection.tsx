import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Star, Ticket } from 'lucide-react'
import { Movie } from '../../types/types'

interface NowShowingSectionProps {
    movies: Movie[]
}

export const NowShowingSection: React.FC<NowShowingSectionProps> = ({ movies }) => {
    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 2,
            spacing: 15,
        },
        breakpoints: {
            '(min-width: 768px)': {
                slides: { perView: 3, spacing: 20 },
            },
            '(min-width: 1024px)': {
                slides: { perView: 4, spacing: 20 },
            },
        },
    })

    return (
        <section className="py-12 px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-6">Now Showing</h2>
            <div ref={sliderRef} className="keen-slider">
                {movies.map((movie) => (
                    <div key={movie.id} className="keen-slider__slide">
                        <Card className="bg-gray-800 overflow-hidden">
                            <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
                            <CardContent className="p-4">
                                <h3 className="font-semibold mb-2">{movie.title}</h3>
                                <div className="flex items-center justify-between">
                                    <Badge variant="secondary">
                                        <Star className="w-4 h-4 mr-1" />
                                        {movie.rating}
                                    </Badge>
                                    <Button variant="ghost" size="sm">
                                        <Ticket className="w-4 h-4 mr-2" />
                                        Book
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}