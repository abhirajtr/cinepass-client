import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from 'lucide-react';
import axiosInstance from "../../axiosInstance";
import { formatVotes, getLanguageName } from "../../constants";
import { buttonVariants } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

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
};

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

interface Review {
    id: number;
    userId: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axiosInstance.get(`/user/movie/${movieId}/details`);
                setMovieDetails(response.data.responseData.movieDetails);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get(`/user/movie/${movieId}/reviews`);
                setReviews(response.data.responseData.reviews);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovieDetails();
        fetchReviews();
    }, [movieId]);

    const handleRatingChange = (rating: number) => {
        setUserRating(rating);
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/user/movie/${movieId}/review`, {
                rating: userRating,
                comment: userReview,
            });
            const newReview = response.data.responseData.review;
            setReviews([newReview, ...reviews]);
            setUserRating(0);
            setUserReview("");
        } catch (error) {
            console.log(error);
        }
    };

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-background text-foreground min-h-screen">
            {/* Header Section */}
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/w1280/${movieDetails.backdropPath}`}
                    alt="Movie Banner"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                <div className="absolute top-0 left-0 flex items-center gap-6 px-8 py-8">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movieDetails.posterPath}`}
                        alt="Movie Poster"
                        className="w-48 h-64 object-cover rounded-lg shadow-lg"
                    />
                    <div>
                        <h1 className="text-4xl font-bold">{movieDetails.title}</h1>
                        <div className="mt-2 flex items-center gap-4">
                            <Badge className="bg-red-600">
                                {movieDetails.voteAverage.toFixed(2)}/10 <Star className="inline-block ml-1 h-4 w-4" />
                            </Badge>
                            <p className="text-foreground">({formatVotes(movieDetails.voteCount)} Votes)</p>
                        </div>
                        <p className="mt-4">
                            {getLanguageName(movieDetails.language)} • {movieDetails.runtime} • {" "}
                            {movieDetails.genre.join(', ')} • UA • {movieDetails.releaseDate}
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
                    {movieDetails.overview}
                </p>
            </div>

            {/* Cast Section */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="flex overflow-x-auto gap-6">
                    {movieDetails.cast.map((item) => (
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

            {/* Crew Section */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">Crew</h2>
                <div className="flex overflow-x-auto gap-6">
                    {movieDetails.crew.map((item) => (
                        <div key={item.id} className="flex flex-col items-center">
                            <img
                                src={`https://image.tmdb.org/t/p/w185${item.profilePath}`}
                                alt="Crew Member"
                                className="w-24 h-24 object-cover rounded-full border border-gray-700"
                            />
                            <p className="text-gray-300 mt-2 break-words">{item.name}</p>
                            <p className="text-gray-500 text-sm">as {item.job}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Form */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">Add Your Review</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="rating">Rating</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingChange(star)}
                                    className={`text-2xl ${star <= userRating ? 'text-yellow-400' : 'text-gray-400'}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="review">Your Review</Label>
                        <Textarea
                            id="review"
                            value={userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                            placeholder="Write your review here..."
                            className="h-32"
                        />
                    </div>
                    <Button type="submit">Submit Review</Button>
                </form>
            </div>

            {/* Reviews Section */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="p-4 bg-gray-800 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold">{review.userName}</p>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`text-lg ${star <= review.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-300">{review.comment}</p>
                            <p className="text-gray-500 text-sm mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;