import { CinemaLocationsSection } from "@/components/User/CinemaLocationsSection";
import HeroSection from "@/components/User/HeroSection";
import { MovieTabs } from "@/components/User/MovieTabs";
import { NowShowingSection } from "@/components/User/NowShowingSection";
import { SpecialOffersSection } from "@/components/User/SpecialOffersSection";
import { WatchlistSection } from "@/components/User/WatchlistSection";
// import Footer from "@/layout/components/Footer";
import { Cinema, Movie } from "@/types/types";

// const featuredMovie: Movie & { duration: string; releaseDate: string; rating: number } = {
//     id: 0,
//     title: "Dune: Part Two",
//     image: "https://image.tmdb.org/t/p/w1280/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
//     rating: 4.8,
//     duration: "2h 46min",
//     releaseDate: "March 1, 2024"
// }

const nowShowingMovies: Movie[] = [
    { id: 1, title: "Oppenheimer", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", rating: 4.9 },
    { id: 2, title: "Barbie", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", rating: 4.7 },
    { id: 3, title: "The Batman", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", rating: 4.6 },
    { id: 4, title: "Top Gun: Maverick", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", rating: 4.8 },
]

const trendingMovies: Movie[] = [
    { id: 5, title: "Inception", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", rating: 4.9 },
    { id: 6, title: "The Dark Knight", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", rating: 4.8 },
    { id: 7, title: "Interstellar", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", rating: 4.7 },
    { id: 8, title: "Pulp Fiction", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", rating: 4.6 },
]

const comingSoonMovies: Movie[] = [
    { id: 9, title: "Furiosa", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", releaseDate: "May 24, 2024" },
    { id: 10, title: "Mission: Impossible 8", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", releaseDate: "June 28, 2024" },
    { id: 11, title: "Joker: Folie à Deux", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", releaseDate: "October 4, 2024" },
    { id: 12, title: "Gladiator 2", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", releaseDate: "November 22, 2024" },
]

const watchlist: Movie[] = [
    { id: 13, title: "The Godfather", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg" },
    { id: 14, title: "Schindler's List", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg" },
    { id: 15, title: "12 Angry Men", image: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg" },
]

const cinemaLocations: Cinema[] = [
    { id: 1, name: "CineWorld Downtown", address: "123 Main St, Cityville" },
    { id: 2, name: "StarPlex Uptown", address: "456 Oak Ave, Townsburg" },
    { id: 3, name: "Mega Cinemas", address: "789 Pine Rd, Villageton" },
]

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <HeroSection />
            <NowShowingSection movies={nowShowingMovies} />
            <MovieTabs trendingMovies={trendingMovies} comingSoonMovies={comingSoonMovies} />
            <WatchlistSection watchlist={watchlist} />
            <CinemaLocationsSection cinemaLocations={cinemaLocations} />
            <SpecialOffersSection />
            {/* <Footer /> */}
        </div>
    )
}