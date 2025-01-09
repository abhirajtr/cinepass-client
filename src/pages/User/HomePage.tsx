import axiosInstance from "../../axiosInstance.ts";
import HeroSection from "../../components/User/HeroSection";
import MovieSection from "../../components/User/MovieSection";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const HomePage = () => {
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
    const district = useSelector((state: RootState) => state.location.district);

    useEffect(() => {
        const fetchNowShowingMoviesList = async () => {
            try {
                const response = await axiosInstance.get(`/user/movies/nowShowing?district=${district}`,);
                setNowShowingMovies(response.data?.responseData?.nowShowingMovies);
                console.log(response);

            } catch (error) {
                console.log(error);
            }
        }
        fetchNowShowingMoviesList();
    }, [district]);

    return (
        <main>
            <HeroSection />
            <MovieSection title="Now Showing" type="now-showing" movies={nowShowingMovies} />
            <MovieSection title="In Theatres" type="in-theatres" movies={nowShowingMovies} />
            {/* <MovieSection title="Upcoming Movies" type="upcoming" /> */}
            {/* <PersonalizedSection /> */}
        </main>
    )
}

export default HomePage;