import { FC } from "react";
import Title from "./Title";
import MovieCarousel from "./MovieCarousel";

interface Movie {
    id: string;
    title: string;
    genre: string;
    posterUrl: string;
}

interface RecomendedMoviesProps {
    movies: Movie[];
}

const RecomendedMovies: FC<RecomendedMoviesProps> = ({ movies }) => {
    return (
        <section className="mx-auto py-12 px-4 max-w-7xl relative">
            <div className="text-3xl py-8">
                <Title text1={'Recomended'} text2={'Movies'} />
            </div>
            <MovieCarousel movies={movies} />
        </section>
    );
};

export default RecomendedMovies;