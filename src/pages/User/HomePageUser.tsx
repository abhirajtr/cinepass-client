// import { HeroSection } from "@/components/hero-section"
// import { HorizontalMovieSection } from "@/components/horizontal-movie-section"
// import { PromotionsSection } from "@/components/promotions-section"

import HeroSection from "@/components/User/HeroSection"
import { HorizontalMovieSection } from "./HorizontalMovieSection"
import PromotionsSection from "./PromotionsSection"

const nowShowingMovies = [
    { title: "Inception", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 8.8 },
    { title: "The Dark Knight", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 9.0 },
    { title: "Interstellar", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 8.6 },
    { title: "Pulp Fiction", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 8.9 },
    { title: "The Shawshank Redemption", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 9.3 },
    { title: "The Godfather", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 9.2 },
]

const trendingMovies = [
    { title: "The Shawshank Redemption", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 9.3 },
    { title: "The Godfather", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 9.2 },
    { title: "The Dark Knight", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 9.0 },
    { title: "12 Angry Men", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 9.0 },
    { title: "Schindler's List", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 8.9 },
    { title: "The Lord of the Rings: The Return of the King", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 8.9 },
]

const upcomingMovies = [
    { title: "Dune: Part Two", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 0 },
    { title: "Deadpool 3", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 0 },
    { title: "Furiosa", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 0 },
    { title: "Joker: Folie à Deux", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 0 },
    { title: "Mission: Impossible – Dead Reckoning Part Two", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 0 },
    { title: "Blade", imageUrl: "https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg", rating: 0 },
]

const HomePageUser = () => {
    return (
        <>
            <HeroSection />
            <HorizontalMovieSection title="Now Showing" movies={nowShowingMovies} />
            <HorizontalMovieSection title="Trending Movies" movies={trendingMovies} />
            <HorizontalMovieSection title="Upcoming Movies" movies={upcomingMovies} />
            <PromotionsSection />
        </>
    )
}

export default HomePageUser;
