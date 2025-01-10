import { useRef } from 'react';
import { CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatVotes } from '../../constants';

interface Movie {
    movieId: string;
    title: string;
    posterPath: string;
    voteCount: number;
    voteAverage: number;
    genre: string[];
}

interface MovieSectionProps {
    title: string;
    type: string;
    movies: Movie[];
}

const MovieSection = ({ title, movies }: MovieSectionProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-8">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                    {/* <Link to="/movies" className="text-red-600 text-sm font-medium hover:underline">
                        See All &gt;
                    </Link> */}
                </div>
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {movies.map((movie) => (
                            <div
                                key={movie.movieId}
                                className="flex-none w-48 bg-card rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
                            >
                                <Link to={`/movie/${movie.movieId}/details`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                        alt={movie.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </Link>
                                <CardContent className="p-3">
                                    <h3 className="text-sm font-semibold mb-1 truncate">{movie.title}</h3>
                                    <div className="flex items-center text-xs mb-2">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="ml-1">
                                            {movie?.voteAverage?.toFixed(2)}/10 &bull; {formatVotes(movie.voteCount)} Votes
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{movie.genre.join(', ')}</p>
                                </CardContent>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-background"
                        onClick={() => scroll('left')}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-background"
                        onClick={() => scroll('right')}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default MovieSection;