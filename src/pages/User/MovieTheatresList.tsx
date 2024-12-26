import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '@/axiosInstance';
import { extractTime, getLanguageName } from '@/constants';

// Cast member type
export interface CastMember {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
    _id: string;
}

// Crew member type
export interface CrewMember {
    id: number;
    name: string;
    job: string;
    profilePath: string | null;
    _id: string;
}

// Movie type
export interface Movie {
    _id: string;
    movieId: string;
    title: string;
    genre: string[];
    language: string;
    releaseDate: string;
    posterPath: string;
    runtime: string;
    backdropPath: string;
    overview: string;
    voteAverage: number;
    voteCount: number;
    cast: CastMember[];
    crew: CrewMember[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Show type
export interface Show {
    showId: string;
    movieTitle: string;
    startTime: string;
}

// Theatre type
export interface Theatre {
    theatreId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    shows: Show[];
}

// Response data type
export interface ResponseData {
    movie: Movie;
    theatres: Theatre[];
}

// API response type
export interface ApiResponse {
    responseCode: number;
    responseMessage: string;
    responseData: ResponseData;
    timeStamp: string;
}


const MovieTheatresList = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    });
    const [theaters, setTheaters] = useState<Theatre[]>([]);
    const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
    const { movieId } = useParams();

    const getNextDates = () => {
        const currentDate = new Date();
        const dates = [];
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        for (let i = 0; i < 4; i++) {
            const futureDate = new Date(currentDate);
            futureDate.setDate(currentDate.getDate() + i);

            const weekday = weekdays[futureDate.getDay()];
            const month = months[futureDate.getMonth()];
            const day = futureDate.getDate();

            dates.push({ weekday, month, day, fullDate: futureDate.toISOString().split('T')[0] });
        }
        return dates;
    };

    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const { data } = await axiosInstance.get<ApiResponse>(`/user/movie/${movieId}/theatres`, {
                    params: { date: selectedDate, city: "Kochi" },
                });
                // const fetchedTheatres = response.data.responseData?.theatres;
                setTheaters(data.responseData?.theatres);
                setMovieDetails(data.responseData?.movie);

            } catch (error) {
                console.error('Error fetching shows:', error);
            }
        };

        fetchTheatres();
    }, [movieId, selectedDate]);

    const nextDates = getNextDates();

    return (
        <div className="mx-auto px-8 py-8">
            {/* Movie Title */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-2">{movieDetails?.title} ({getLanguageName(movieDetails?.language)})</h1>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">2D</Badge>
                    {movieDetails?.genre.map((item: string) => (
                        <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                </div>
            </div>

            {/* Date Selector */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                    {nextDates.map(({ weekday, month, day, fullDate }) => (
                        <Button
                            key={fullDate}
                            variant={selectedDate === fullDate ? 'default' : 'ghost'}
                            className="flex flex-col justify-center gap-0 items-center py-6 px-6"
                            onClick={() => setSelectedDate(fullDate)}
                        >
                            <span className="text-xs">{weekday}</span>
                            <span className="text-xs font-semibold">{day}</span>
                            <span className="text-xs font-semibold">{month}</span>
                        </Button>
                    ))}
                </div>
                <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Theatre List */}
            {theaters.length === 0 ? (
                <div className="p-10">No shows found for the movie</div>
            ) : (
                <div className="space-y-6">
                    {theaters.map((theater, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">{theater.name}, {theater.city}</h3>
                                </div>
                                <Button variant="ghost" size="sm">INFO</Button>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {theater.shows.map((show, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline"
                                        className="flex flex-col items-center"
                                        onClick={() => navigate(`/seat-selection/${show.showId}`)}
                                    >
                                        <span className="text-sm font-medium">{extractTime(show.startTime)}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


{/* <div className="space-y-6">
    {theaters.map((theater, index) => (
        <div key={index} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold mb-1">{theater.name}, {theater.city}</h3>
                </div>
                <Button variant="ghost" size="sm">INFO</Button>
            </div>
            <div className="flex flex-wrap gap-4">
                {theater.showTimes.map((showTime, idx) => (
                    <Button
                        key={idx}
                        variant="outline"
                        className="flex flex-col items-center"
                        onClick={() => navigate(`/seat-selection/${showTime.showId}`)}
                    >
                        <span className="text-sm font-medium">{showTime.startTime}</span>
                    </Button>
                ))}
            </div>
        </div>
    ))}
</div> */}

export default MovieTheatresList;