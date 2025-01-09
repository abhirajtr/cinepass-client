import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { X, Search } from 'lucide-react'
import axiosInstance from '@/axiosInstance'
import { Link } from 'react-router-dom'

// interface Cinema {
//     name: string
//     location: string
//     features: string
// }

interface Movie {
    movieId: string
    title: string
    genre: string[]
    rating: number
}

interface Theatre {
    theatreId: string;
    name: string;
    location: string
}

// const theatres: Cinema[] = [
//     { name: "PVR: Lulu", location: "Kochi", features: "4K Dolby Atmos" },
//     { name: "PVR: Forum Mall", location: "Kochi", features: "4K 3D" },
//     { name: "Cinepolis: Centre Square", location: "Kochi", features: "4K Dolby Atmos" },
//     { name: "PVR: Oberon Mall", location: "Kochi", features: "4K 3D" },
//     { name: "G Cinemas Fort Kochi", location: "Kochi", features: "4K Dolby ATMOS" },
//     // ... add more theatres as needed
// ]

// const movies: Movie[] = [
//     { title: "Inception", genre: "Sci-Fi", rating: 8.8 },
//     { title: "The Shawshank Redemption", genre: "Drama", rating: 9.3 },
//     { title: "The Dark Knight", genre: "Action", rating: 9.0 },
//     { title: "Pulp Fiction", genre: "Crime", rating: 8.9 },
//     { title: "Forrest Gump", genre: "Drama", rating: 8.8 },
//     // ... add more movies as needed
// ]

// interface Movie {
//     movieId: string;
//     title: string;
// }

interface FullScreenSearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function FullScreenSearchModal({ isOpen, onClose }: FullScreenSearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('movies');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [theatres, setTheatres] = useState<Theatre[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await axiosInstance.get('/user/movies', {
                    params: { search: "" }
                });
                console.log(data);

                setMovies(data.responseData);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchTheatres = async () => {
            try {
                const { data } = await axiosInstance.get('/user/theatres', {
                    params: { search: "" }
                });
                setTheatres(data.responseData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTheatres();
        fetchMovies();
    }, []);

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.includes(searchQuery.toLowerCase())
    )

    // const filteredCinemas = theatres.filter(cinema =>
    //     cinema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     cinema.location.toLowerCase().includes(searchQuery.toLowerCase())
    // )

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-full h-full p-8 bg-background">
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 text-lg"
                                autoFocus
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow overflow-hidden">
                        <TabsList className="w-full justify-start px-4 mt-2 bg-inherit">
                            <TabsTrigger value="movies" className="text-lg px-6">MOVIES</TabsTrigger>
                            {/* <TabsTrigger value="theatres" className="text-lg px-6">CINEMAS</TabsTrigger> */}
                        </TabsList>
                        <div className="flex-grow overflow-auto p-4">
                            <TabsContent value="movies">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredMovies.map((movie, index) => (
                                        <Link to={`movie/${movie.movieId}/details`} onClick={() => onClose()} key={index} className="bg-card rounded-lg p-4 shadow">
                                            <h3 className="font-semibold text-lg">{movie.title}</h3>
                                            <p className="text-muted-foreground">{movie.genre.join(", ")}</p>
                                            <p className="text-sm mt-2">Rating: {movie.rating}/10</p>
                                        </Link>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="theatres">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {theatres.map((theatre, index) => (
                                        <div key={index} className="bg-card rounded-lg p-4 shadow">
                                            <h3 className="font-semibold text-lg">{theatre.name}</h3>
                                            <p className="text-muted-foreground">{theatre.location}</p>
                                            {/* <p className="text-sm mt-2">{cinema.features}</p> */}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}

