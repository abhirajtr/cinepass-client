import React from 'react';
import { Link } from 'react-router-dom';

interface Movie {
    id: string;
    title: string;
    genre: string;
    posterUrl: string;
}

const MovieCard: React.FC<Movie> = ({ id, title, genre, posterUrl }) => {
    return (
        <Link to={`/movie/${id}`} className="max-w-xs w-56 rounded-lg overflow-hidden shadow-lg bg-grey-11 backdrop-blur-lg transition-transform transform hover:scale-105 shrink-0 cursor-pointer">
            <img className="w-full h-72 object-cover" src={posterUrl} alt={title} />
            <div className="px-4 py-2">
                <h3 className="font-bold text-lg mb-1 text-grey-70">{title}</h3>
                <p className="text-grey-70">{genre}</p>
            </div>
        </Link>
    );
};

export default MovieCard;