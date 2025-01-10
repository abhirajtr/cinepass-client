import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FaCalendarAlt, FaFilm } from "react-icons/fa"
import { Button } from "../../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import theatreOwnerApi from "../../axiosInstance/theatreOwnerApi"

const formSchema = z.object({
    movieId: z.string().min(1, "Movie is required"),
    movieTitle: z.string().min(1, "Movie title is required"),
    startTime: z.string().min(1, "Start time is required"),
})

type FormData = z.infer<typeof formSchema>

interface ShowFormProps {
    onSubmit: (data: FormData) => void
    initialData?: Partial<FormData>
}

interface Movie {
    movieId: string;
    title: string;
    runtime: string;
}

export default function ShowForm({ onSubmit, initialData }: ShowFormProps) {
    const [movies, setMovies] = useState<Movie[]>([]);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            movieId: "",
            movieTitle: "",
            startTime: "",
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await theatreOwnerApi.get("/movies");
                setMovies(response.data.responseData?.movies);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])

    const handleSubmit = (data: FormData) => {
        onSubmit(data);
        if (!initialData) {
            form.reset()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="movieId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center">
                                <FaFilm className="mr-2" /> Select Movie
                            </FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    const selectedMovie = movies.find(movie => movie.movieId === value);
                                    if (selectedMovie) {
                                        form.setValue("movieId", selectedMovie.movieId);
                                        form.setValue("movieTitle", selectedMovie.title);
                                    }
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a movie" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {movies.map((movie) => (
                                        <SelectItem key={movie.movieId} value={movie.movieId}>
                                            {movie.title} ({movie.runtime} mins)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center">
                                <FaCalendarAlt className="mr-2" /> Show Start Time
                            </FormLabel>
                            <FormControl>
                                <Input className="" type="datetime-local" {...field} 
                                    min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
                                        .toISOString()
                                        .slice(0, 16)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">{initialData ? 'Update Show' : 'Add Show'}</Button>
            </form>
        </Form>
    )
}

