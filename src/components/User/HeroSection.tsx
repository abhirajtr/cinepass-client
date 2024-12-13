import { Button } from '@/components/ui/button'

export default function HeroSection() {
    return (
        <div className="relative bg-gray-900 overflow-hidden">
            <div className="mx-auto">
                <div className="relative z-10 pb-8 bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Book your favorite</span>{' '}
                                <span className="block text-primary xl:inline">movies today</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Get the best seats for the latest blockbusters. Easy booking, great deals, and an unforgettable cinema experience await you.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Button size="lg" className="w-full">
                                        Book Tickets Now
                                    </Button>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Button size="lg" variant="outline" className="w-full">
                                        Explore Movies
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="/placeholder.svg?height=600&width=800"
                    alt="Featured movie banner"
                />
            </div>
        </div>
    )
}

