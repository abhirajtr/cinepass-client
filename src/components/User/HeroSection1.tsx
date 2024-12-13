import { Button } from "@/components/ui/button"

const HeroSection = () => {
    return (
        <section className="relative h-[400px] flex items-center justify-center text-center text-foreground">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://image.tmdb.org/t/p/w1280/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-3">Venom: The Last Dance</h1>
                <p className="text-lg mb-6">
                Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.
                </p>
                <Button size="lg">Book Tickets Now</Button>
            </div>
        </section>
    )
}

export default HeroSection;