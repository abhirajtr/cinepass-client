import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface HorizontalMovieSectionProps {
    title: string
    movies: Array<{
        title: string
        posterPath: string
        // rating: number
    }>
}

export function HorizontalMovieSection({ title, movies }: HorizontalMovieSectionProps) {
    return (
        <section className="py-6">
            <div className="container">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                    {/* <div className="flex w-max space-x-4 p-4">
                        {movies.map((movie) => (
                            <MovieCard key={movie.title} {...movie} />
                        ))}
                    </div> */}
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </section>
    )
}

