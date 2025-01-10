import React from 'react'
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { TrendingUp } from 'lucide-react'
import { Movie } from '../../types/types'

interface MovieTabsProps {
    trendingMovies: Movie[]
    comingSoonMovies: Movie[]
}

export const MovieTabs: React.FC<MovieTabsProps> = ({ trendingMovies, comingSoonMovies }) => {
    return (
        <section className="py-12 px-4 md:px-8">
            <Tabs defaultValue="trending" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
                </TabsList>
                <TabsContent value="trending">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {trendingMovies.map((movie) => (
                            <Card key={movie.id} className="bg-gray-800 overflow-hidden">
                                <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-2">{movie.title}</h3>
                                    <Badge variant="secondary">
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                        Trending
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="coming-soon">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {comingSoonMovies.map((movie) => (
                            <Card key={movie.id} className="bg-gray-800 overflow-hidden">
                                <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-2">{movie.title}</h3>
                                    <p className="text-sm text-gray-400">{movie.releaseDate}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    )
}