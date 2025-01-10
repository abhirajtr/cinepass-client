import { useRef } from "react"
import { Card, CardContent } from "../../components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "../../components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "../../components/ui/button"

const banners = [
    {
        id: 1,
        image: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        alt: "Oppenheimer",
        title: "Oppenheimer",
        tagline: "The world forever changes"
    },
    {
        id: 2,
        image: "https://image.tmdb.org/t/p/w1280/1YGHfJG7daHrJi9OziN80fYgua3.jpg",
        alt: "Barbie",
        title: "Barbie",
        tagline: "She's everything. He's just Ken."
    },
    {
        id: 3,
        image: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        alt: "Mission: Impossible - Dead Reckoning Part One",
        title: "Mission: Impossible - Dead Reckoning Part One",
        tagline: "We all share the same fate"
    },
]

const  BannerCarousel = () => {
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )

    return (
        <Carousel
            className="w-full mx-auto"
            plugins={[plugin.current]}
            // onMouseEnter={plugin.current.stop}
            // onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {banners.map((banner) => (
                    <CarouselItem key={banner.id}>
                        <Card className="border-0 rounded-none overflow-hidden">
                            <CardContent className="p-0 relative">
                                <div className="relative w-full h-[60vh]">
                                    <img
                                        src={banner.image}
                                        alt={banner.alt}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                                </div>
                                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white space-y-4 max-w-lg">
                                    <h2 className="text-4xl font-bold leading-tight">{banner.title}</h2>
                                    <p className="text-xl">{banner.tagline}</p>
                                    <Button
                                        size="lg"
                                        className="mt-4"
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default BannerCarousel;