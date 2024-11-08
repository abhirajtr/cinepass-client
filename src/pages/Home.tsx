import Hero from "../components/Hero"
import NowShowing from "../components/NowShowing"
import RecomendedMovies from "../components/RecomendedMovies"
import { sampleMovies } from "../constants"


const Home = () => {

    return (
        <div className="min-h-[80vh] py-3 mx-auto max-w-7xl">
            <Hero />
            <RecomendedMovies movies={sampleMovies} />
            <NowShowing movies={sampleMovies} />
        </div>
    )
}

export default Home