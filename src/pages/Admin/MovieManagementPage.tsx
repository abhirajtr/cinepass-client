import { useEffect, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import adminApi from '@/axiosInstance/adminApi'
import { useDebounce } from '@/hooks/useDebounce'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

const movieSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Title is required"),
    genre: z.string().min(1, "Genre is required"),
    language: z.string().min(1, "Language is required"),
    releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Valid release date is required (YYYY-MM-DD)"),
    runtime: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid runtime is required (in minutes)"),
    posterPath: z.string().url("Valid poster URL is required"),
    backdropPath: z.string().url("Valid backdrop URL is required"),
})

type Movie = z.infer<typeof movieSchema>

export default function MovieManagementPage() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 500)

    const form = useForm<Movie>({
        resolver: zodResolver(movieSchema),
        defaultValues: {
            id: '',
            title: '',
            genre: '',
            language: '',
            releaseDate: '',
            runtime: '',
            posterPath: '',
            backdropPath: '',
        },
    })

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await adminApi.get("/movies", {
                    params: { searchTerm: debouncedSearchTerm }
                })
                setMovies(response.data.responseData.movies)
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.responseMessage || "An unexpected error occurred")
                }
                console.error(error)
            }
        }
        fetchMovies()
    }, [debouncedSearchTerm])

    const handleEditMovie = async (data: Movie) => {
        try {
            const response = await adminApi.patch(`/movies/${data.id}/edit`, data)
            toast.success(response.data.responseMessage)
            setMovies(movies.map(movie => movie.id === data.id ? data : movie))
            setIsEditDialogOpen(false)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occurred")
            }
            console.error(error)
        }
    }

    const handleDeleteMovie = async (id: string) => {
        try {
            await adminApi.delete(`/movies/${id}/delete`)
            setMovies(movies.filter(movie => movie.id !== id))
            toast.success("Movie deleted successfully")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occurred")
            }
            console.error(error)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Input
                    className="max-w-sm"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to="/admin/movies/add-movie"
                    className={buttonVariants({ variant: "default" })}
                >Add Movie</Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Release Date</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Runtime</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movies.map((movie) => (
                        <TableRow key={movie.id}>
                            <TableCell>{movie.title}</TableCell>
                            <TableCell>{movie.releaseDate}</TableCell>
                            <TableCell>{movie.genre}</TableCell>
                            <TableCell>{movie.runtime} minutes</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setCurrentMovie(movie)
                                        setIsViewDialogOpen(true)
                                    }}
                                >
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View movie details</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteMovie(movie.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete movie</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Movie</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleEditMovie)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="releaseDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Release Date</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="date" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="runtime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Runtime (minutes)</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="language"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Language</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="posterPath"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Poster URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="backdropPath"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Backdrop URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Movie Details</DialogTitle>
                    </DialogHeader>
                    {currentMovie && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text font-bold">Title:</Label>
                                <span className="col-span-3">{currentMovie.title}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text font-bold">Release Date:</Label>
                                <span className="col-span-3">{currentMovie.releaseDate}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text font-bold">Genre:</Label>
                                <span className="col-span-3">{currentMovie.genre}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text font-bold">Runtime:</Label>
                                <span className="col-span-3">{currentMovie.runtime} minutes</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text font-bold">Language:</Label>
                                <span className="col-span-3">{currentMovie.language}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text font-bold">Poster:</Label>
                                <img  src={`https://image.tmdb.org/t/p/w300${currentMovie.posterPath}`} alt={`${currentMovie.title} poster`} className="col-span-3 w-24 h-auto" />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}