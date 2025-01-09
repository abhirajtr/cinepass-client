import adminApi from "../../axiosInstance/adminApi"
import tmdbApiInstance from "../../axiosInstance/tmdbApi"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { useDebounce } from "../../hooks/useDebounce"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Movie {
    id: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    popularity: string;
    vote_average: string;
}

const AddMoviePageAdmin = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const truncateOverview = (text: string, length: number) => {
        return text.length > length ? `${text.substring(0, length)}...` : text;
    };
    useEffect(() => {
        const fetchLatestMovies = async () => {
            try {
                const response = await tmdbApiInstance.get('/movie/now_playing', {
                    params: {
                        region: "IN",
                    },
                });
                console.log(response);
                
                setMovies(response.data.results);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error("Failed to fetch the latest movies");
                }
                console.log(error);
            }
        };

        fetchLatestMovies();
    }, []);
    useEffect(() => {
        if (!debouncedSearchTerm) return;
        const fetchMovie = async () => {
            try {
                const response = await tmdbApiInstance.get('/search/movie?', {
                    params: {
                        query: debouncedSearchTerm,
                    }
                })
                setMovies(response.data.results);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error("An unexpected error occured");
                }
                console.log(error);
            }
        }
        fetchMovie();
    }, [debouncedSearchTerm]);
    const handleAddMovie = async (id: string) => {
        try {
            const response = await adminApi.post("/movies/add", { id });
            toast.success(response.data.responseMessage);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occured");
            }
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex w-full max-w-sm items-center space-x-2 mb-10">
                <Input
                    type="text"
                    placeholder="Search movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                // onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                {/* <Button
                    type="button"
                    onClick={handleSearch}
                >
                    Search
                </Button> */}
            </div>
            {

            }
            {
                movies.length > 0 &&
                <div className="w-full grid grid-cols-4 gap-3">
                    {
                        movies.map((item, index) =>
                            <Card className="max-w-xl" key={index}>
                                <CardHeader>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                        alt={item.original_title}
                                        className="w-full h-64 object-cover rounded-t-lg"
                                    />
                                    <CardTitle className="mt-2">{item.original_title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div>
                                        <p><b>Runtime:</b> {item.id}</p>
                                        <p><b>Overview:</b> {truncateOverview(item.overview, 100)}</p>
                                        <p><b>Release Date:</b> {item.release_date}</p>
                                        <p><b>Popularity:</b> {item.popularity}</p>
                                        <p><b>Vote Average:</b> {item.vote_average}</p>
                                        {/* <p><b>Runtime:</b> {item.runtime} minutes</p> */}
                                        {/* Add other relevant fields like genres, adult content flag, etc. */}
                                    </div>
                                    <div className="mt-4">
                                        <Button variant="default" size="sm" onClick={() => handleAddMovie(item.id)}>
                                            Add Movie
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    }
                </div>
            }
        </>
    )
}

export default AddMoviePageAdmin
