// import Navbar from './components/Navbar'
// import HeroSection from './components/HeroSection'
// import MovieSection from './components/MovieSection'
// import PersonalizedSection from './components/PersonalizedSection'
// import Footer from './components/Footer'

import axiosInstance from "@/axiosInstance";
import HeroSection from "@/components/User/HeroSection";
import MovieSection from "@/components/User/MovieSection";
import { useEffect, useState } from "react";


const HomePage = () => {
    const [nowShowingMovies, setNowShowingMovies] = useState([]);

    useEffect(() => {
        const fetchNowShowingMoviesList = async () => {
            try {
                const response = await axiosInstance.get("/user/movies/nowShowing");
                setNowShowingMovies(response.data?.responseData?.nowShowingMovies);
                console.log(response);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchNowShowingMoviesList();
    }, []);

    return (
        <main>
            <HeroSection />
            <MovieSection title="Now Showing" type="now-showing" movies={nowShowingMovies} />
            {/* <MovieSection title="Upcoming Movies" type="upcoming" /> */}
            {/* <PersonalizedSection /> */}
        </main>
    )
}

export default HomePage;