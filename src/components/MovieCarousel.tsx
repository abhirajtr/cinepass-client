// MovieCarousel.tsx
import { useRef, FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard"; // Import the MovieCard component

interface Movie {
    id: string;
    title: string;
    genre: string;
    posterUrl: string;
}

interface MovieCarouselProps {
    movies: Movie[];
}

const MovieCarousel: FC<MovieCarouselProps> = ({ movies }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    return (
        <div className="relative">
            <div
                ref={scrollRef}
                className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
            >
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        genre={movie.genre}
                        posterUrl={movie.posterUrl}
                    />
                ))}
            </div>

            {/* Scroll Left Button */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white-90  hover:text-grey-10 hover:bg-green-60 text-white p-2 rounded-full shadow-lg transition duration-300"
            >
                <FaChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>

            {/* Scroll Right Button */}
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white-90  hover:text-grey-10 hover:bg-green-60 text-white p-2 rounded-full shadow-lg transition duration-300"
            >
                <FaChevronRight size={20} />
            </button>
        </div>
    );
};

export default MovieCarousel;
