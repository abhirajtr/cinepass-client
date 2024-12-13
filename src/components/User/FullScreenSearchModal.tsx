import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { X, Search } from 'lucide-react'

interface Cinema {
    name: string
    location: string
    features: string
}

interface Movie {
    title: string
    genre: string
    rating: number
}

const cinemas: Cinema[] = [
    { name: "PVR: Lulu", location: "Kochi", features: "4K Dolby Atmos" },
    { name: "PVR: Forum Mall", location: "Kochi", features: "4K 3D" },
    { name: "Cinepolis: Centre Square", location: "Kochi", features: "4K Dolby Atmos" },
    { name: "PVR: Oberon Mall", location: "Kochi", features: "4K 3D" },
    { name: "G Cinemas Fort Kochi", location: "Kochi", features: "4K Dolby ATMOS" },
    // ... add more cinemas as needed
]

const movies: Movie[] = [
    { title: "Inception", genre: "Sci-Fi", rating: 8.8 },
    { title: "The Shawshank Redemption", genre: "Drama", rating: 9.3 },
    { title: "The Dark Knight", genre: "Action", rating: 9.0 },
    { title: "Pulp Fiction", genre: "Crime", rating: 8.9 },
    { title: "Forrest Gump", genre: "Drama", rating: 8.8 },
    // ... add more movies as needed
]

interface FullScreenSearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function FullScreenSearchModal({ isOpen, onClose }: FullScreenSearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTab, setActiveTab] = useState('movies')

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredCinemas = cinemas.filter(cinema =>
        cinema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cinema.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cinema.features.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                            <TabsTrigger value="cinemas" className="text-lg px-6">CINEMAS</TabsTrigger>
                        </TabsList>
                        <div className="flex-grow overflow-auto p-4">
                            <TabsContent value="movies">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredMovies.map((movie, index) => (
                                        <div key={index} className="bg-card rounded-lg p-4 shadow">
                                            <h3 className="font-semibold text-lg">{movie.title}</h3>
                                            <p className="text-muted-foreground">{movie.genre}</p>
                                            <p className="text-sm mt-2">Rating: {movie.rating}/10</p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="cinemas">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredCinemas.map((cinema, index) => (
                                        <div key={index} className="bg-card rounded-lg p-4 shadow">
                                            <h3 className="font-semibold text-lg">{cinema.name}</h3>
                                            <p className="text-muted-foreground">{cinema.location}</p>
                                            <p className="text-sm mt-2">{cinema.features}</p>
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

