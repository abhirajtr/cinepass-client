import React from 'react';

interface Movie {
    id: string;
    title: string;
    genre: string;
    posterUrl: string;
}

const MovieCard: React.FC<Movie> = ({ id, title, genre, posterUrl }) => {
    return (
        <div className="max-w-xs w-56 rounded-lg overflow-hidden shadow-lg bg-white/10 backdrop-blur-lg transition-transform transform hover:scale-105 shrink-0 cursor-pointer">
            <img className="w-full h-72 object-cover" src={posterUrl} alt={title} />
            <div className="px-4 py-2">
                <h3 className="font-bold text-lg mb-1 text-text-primary ">{title}</h3>
                <p className="text-text-muted">{genre}</p>
            </div>
        </div>
    );
};

export default MovieCard;