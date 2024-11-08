import { FC } from "react";
import Title from "./Title";
import MovieCarousel from "./MovieCarousel";

interface Movie {
    id: string;
    title: string;
    genre: string;
    posterUrl: string;
}

interface NowShowingProps {
    movies: Movie[];
}

const NowShowing: FC<NowShowingProps> = ({ movies }) => {
    return (
        <section className="mx-auto py-12 px-4 max-w-7xl relative">
            <div className="text-3xl py-8">
                <Title text1={'Now'} text2={'Showing'} />
            </div>
            <MovieCarousel movies={movies} />
        </section>
    );
};

export default NowShowing;