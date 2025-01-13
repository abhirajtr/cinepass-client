import { useRef } from "react"
import { Card, CardContent } from "../../components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "../../components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
// import axiosInstance from "@/axiosInstance"

// interface Movie {
//     movieId: string
//     title: string
//     backdropPath: string
//     overview: string
// }

const banners = [
    {
        id: 426063,
        image: "https://image.tmdb.org/t/p/w1280//uWOJbarUXfVf6B4o0368dh138eR.jpg",
        alt: "Nosferatu",
        title: "Nosferatu",
        tagline: "A gothic tale of obsession between a haunted young woman and the terrifying vampire infatuated with her, causing untold horror in its wake."
    },
    {
        id: 857598,
        image: "https://image.tmdb.org/t/p/w1280//keC82cQ8q0ZHthrbvzWq04kGnbv.jpg",
        alt: "పుష్పా 2 - The Rule",
        title: "పుష్పా 2 - The Rule",
        tagline: "Pushpa struggles to sustain his sandalwood smuggling business in the face of tough opposition from the police, led by arch-rival Bhanwar Singh Shekhawat."
    },
    {
        id: 1196470,
        image: "https://image.tmdb.org/t/p/w1280//csQSGH0QU8D3Ov5YLEYuHep8ihA.jpg",
        alt: "Survivre",
        title: "Survivre",
        tagline: "A couple celebrates their son’s birthday in the middle of the ocean on their boat. A violent storm hits and it brings up hungry creatures from the depths and they fight for their survival."
    },
]

const BannerCarousel = () => {

    // useEffect(() => {
    //     const fetchMovies = async () => {
    //         try {
    //             const { data } = await axiosInstance.get()
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }, [])
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
                                    <Button asChild
                                        size="lg"
                                        className="mt-4"
                                    >
                                        <Link to={`movie/${banner.id}/details`}>
                                            Book Now
                                        </Link>
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