import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search } from 'lucide-react'

const HomePageUser = () => {
    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background text-primary">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <img
                            src="https://image.tmdb.org/t/p/w1280/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg"
                            alt="Featured Movie"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                            width={1280}
                            height={720}
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground-900">
                                    Book Your Movie Tickets Now
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Experience the latest blockbusters in stunning quality. Reserve your seats today and enjoy the show!
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg">Book Now</Button>
                                <Button size="lg" variant="outline">
                                    View Showtimes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">Now Showing</h2>
                    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                        <div className="flex w-max space-x-4 p-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="w-[250px] space-y-3">
                                    <div className="overflow-hidden rounded-md">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/e6cCBe7DQOn9OFdFJ0eyVwSC8hR.jpg`}
                                            alt={`Movie ${i}`}
                                            className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
                                            width={250}
                                            height={330}
                                        />
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <h3 className="font-medium leading-none">Movie Title {i}</h3>
                                        <p className="text-xs text-muted-foreground">Genre • Duration</p>
                                    </div>
                                    <Button className="w-full">Book Now</Button>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">Trending</h2>
                    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                        <div className="flex w-max space-x-4 p-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="w-[250px] space-y-3">
                                    <div className="overflow-hidden rounded-md">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/e6cCBe7DQOn9OFdFJ0eyVwSC8hR.jpg`}
                                            alt={`Trending Movie ${i}`}
                                            className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
                                            width={250}
                                            height={330}
                                        />
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <h3 className="font-medium leading-none">Trending Movie {i}</h3>
                                        <p className="text-xs text-muted-foreground">Genre • Duration</p>
                                    </div>
                                    <Button className="w-full">Book Now</Button>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-foreground-50">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Find Your Perfect Movie</h2>
                            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Search for movies, check showtimes, and book your tickets all in one place.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input className="max-w-lg flex-1" placeholder="Search movies..." type="search" />
                                <Button type="submit" size="icon">
                                    <Search className="h-4 w-4" />
                                    <span className="sr-only">Search</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePageUser;