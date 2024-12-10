import axios from "axios";

console.log(import.meta.env.VITE_TMDB_API_Read_Access_Token);

const tmdbApiInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${import.meta.env.VITE_TMDB_API_Read_Access_Token}`
    }
});

export default tmdbApiInstance;