import theatreOwnerApi from "@/axiosInstance/theatreOwnerApi"
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { AxiosError } from "axios"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Movie {
    id: string
    title: string
    genre: string[]
    language: string
    releaseDate: string
    posterPath: string
    runtime: string
    backdropPath: string
}

const MoviesTheatreOwnerPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await theatreOwnerApi.get("/movies",)
                setMovies(response.data.responseData.movies)
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.responseMessage || "An unexpected error occurred")
                }
                console.error(error)
            }
        }
        fetchMovies()
    }, [])
    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-bold mb-6">Movies</h2>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default MoviesTheatreOwnerPage;


function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Card className="w-[250px] shadow-lg">
            <CardHeader className="p-0">
                <div className="aspect-[2/3] relative">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                        alt={`${movie.title} poster`}
                        className="object-cover w-full h-full rounded-t-lg"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-lg font-bold truncate">{movie.title}</CardTitle>
                <p className="text-sm text-gray-500 mb-2">{new Date(movie.releaseDate).getFullYear()}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                    {movie.genre.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between text-sm text-gray-500">
                <span>{movie.language}</span>
                <span>{movie.runtime}</span>
            </CardFooter>
        </Card>
    )
}