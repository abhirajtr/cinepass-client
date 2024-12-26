import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/axiosInstance";
import { formatVotes, getLanguageName } from "@/constants";

type CastMember = {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
};
type CrewMember = {
    id: number;
    name: string;
    job: string;
    profilePath: string | null;
}

interface MovieDetails {
    id: string;
    title: string;
    posterPath: string;
    backdropPath: string;
    language: string;
    releaseDate: string;
    runtime: string;
    genre: string[];
    overview: string;
    voteAverage: number;
    voteCount: number;
    cast: CastMember[];
    crew: CrewMember[];
}

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axiosInstance.get(`/user/movie/${movieId}/details`);
                setMovieDetails(response.data.responseData.movieDetails);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMovieDetails();
    }, [movieId]);
    return (
        <div className="bg-background text-foreground min-h-screen">
            {/* Header Section */}
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/w1280/${movieDetails?.backdropPath}`}
                    alt="Movie Banner"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                <div className="absolute top-0 left-0 flex items-center gap-6 px-8 py-8">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movieDetails?.posterPath}`}
                        alt="Movie Poster"
                        className="w-48 h-64 object-cover rounded-lg shadow-lg"
                    />
                    <div>
                        <h1 className="text-4xl font-bold">{movieDetails?.title}</h1>
                        <div className="mt-2 flex items-center gap-4">
                            <Badge className="bg-red-600">
                                {movieDetails?.voteAverage?.toFixed(2)}/10 <Star className="inline-block ml-1 h-4 w-4" />
                            </Badge>
                            <p className="text-foreground">({formatVotes(movieDetails?.voteCount)} Votes)</p>
                        </div>
                        {/* <p className="mt-4 text-gray-300">
                            2D, 3D, ICE, IMAX 2D, 4DX 3D • Telugu, Hindi, Tamil • 3h 20m •
                            Action, Thriller • UA • 5 Dec, 2024
                        </p> */}
                        <p className="mt-4">
                            {getLanguageName(movieDetails?.language)} • {movieDetails?.runtime} • {" "}
                            {movieDetails?.genre.join(', ')} • UA • {movieDetails?.releaseDate}
                        </p>
                        <Link
                            to={`/movie/${movieId}/theatres`}
                            className={`${buttonVariants({ variant: "default" })} mt-6 bg-red-600`}
                        >
                            Book Tickets
                        </Link>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">About the Movie</h2>
                <p className="text-gray-300">
                    {movieDetails?.overview}
                </p>
            </div>

            {/* Cast Section */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="flex overflow-x-auto gap-6">
                    {movieDetails?.cast.map((item) => (
                        <div key={item.id} className="flex flex-col items-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w185${item.profilePath}`}
                                alt="Actor"
                                className="w-24 h-24 object-cover rounded-full border border-gray-700"
                            />
                            <p className="text-gray-300 mt-2">{item.name}</p>
                            <p className="text-gray-500 text-sm">as {item.character}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">Crew</h2>
                <div className="flex overflow-x-auto gap-6">
                    {movieDetails?.crew.map((item) => (
                        <div key={item.id} className="flex flex-col items-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w185${item.profilePath}`}
                                alt="Actor"
                                className="w-24 h-24 object-cover rounded-full border border-gray-700"
                            />
                            <p className="text-gray-300 mt-2 break-words">{item.name}</p>
                            <p className="text-gray-500 text-sm">as {item.job}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews Section */}
            {/* <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">Top Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((review) => (
                        <div key={review} className="p-4 bg-gray-800 rounded-lg">
                            <p className="text-gray-400 text-sm mb-2">#Blockbuster #GreatActing</p>
                            <p className="text-gray-300">
                                "Amazing performance by the cast, great storyline, and thrilling
                                direction. Highly recommended!"
                            </p>
                            <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
                                <span>9/10</span>
                                <span>7 Days Ago</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Recommendations Section */}
            {/* <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">You Might Also Like</h2>
                <div className="flex overflow-x-auto gap-6">
                    {[1, 2, 3, 4].map((movie) => (
                        <div key={movie} className="w-48">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Movie Poster"
                                className="w-full h-64 object-cover rounded-lg"
                            />
                            <p className="text-gray-300 mt-2 text-center">Movie Name</p>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
}


export default MovieDetailsPage;