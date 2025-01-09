import hero_img from './assets/hero_img.jpg';
import banner1 from './assets/banner1.jpg';
import banner2 from './assets/banner2.png';
import banner3 from './assets/banner3.png';
import banner4 from './assets/banner4.png';
import banner5 from './assets/banner5.png';

export type UserRole = 'user' | 'admin' | 'theatreOwner';
export const assets = {
    hero_img,
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
}

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const sampleMovies = [
    {
        id: "1",
        title: "Inception",
        genre: "Sci-Fi, Action",
        posterUrl: "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg?w=740",
    },
    {
        id: "2",
        title: "Avatar",
        genre: "Adventure, Sci-Fi",
        posterUrl: "https://img.freepik.com/free-psd/jazz-concert-print-template_23-2149063916.jpg?w=740",
    },
    {
        id: "3",
        title: "The Dark Knight",
        genre: "Action, Crime",
        posterUrl: "https://img.freepik.com/free-vector/vintage-cinema-movie-poster-template_52683-57828.jpg?w=740",
    },
    {
        id: "4",
        title: "Interstellar",
        genre: "Adventure, Drama",
        posterUrl: "https://img.freepik.com/free-vector/realistic-thriller-movie-poster-with-photo-effect_1361-1690.jpg?w=740",
    },
    {
        id: "5",
        title: "The Matrix",
        genre: "Sci-Fi, Action",
        posterUrl: "https://img.freepik.com/free-psd/horror-movie-night-poster-template_23-2148619778.jpg?w=740",
    },
    {
        id: "6",
        title: "Pulp Fiction",
        genre: "Crime, Drama",
        posterUrl: "https://img.freepik.com/free-psd/movie-festival-poster-template_23-2148609645.jpg?w=740",
    },
    {
        id: "7",
        title: "The Shawshank Redemption",
        genre: "Drama",
        posterUrl: "https://img.freepik.com/free-psd/urban-film-festival-poster-template_23-2148727327.jpg?w=740",
    },
    {
        id: "8",
        title: "Forrest Gump",
        genre: "Drama, Romance",
        posterUrl: "https://img.freepik.com/free-psd/cinema-festival-poster-template_23-2148582745.jpg?w=740",
    },
    {
        id: "9",
        title: "Fight Club",
        genre: "Drama, Thriller",
        posterUrl: "https://img.freepik.com/free-psd/suspense-movie-poster-template_23-2148565324.jpg?w=740",
    },
    {
        id: "10",
        title: "Gladiator",
        genre: "Action, Adventure",
        posterUrl: "https://img.freepik.com/free-psd/action-movie-poster-template_23-2148571244.jpg?w=740",
    },
];

//to format data and time
export const formatDate = (datestring: string): string => {
    return new Date(datestring).toISOString().slice(0, 16).replace("T", " ");
}


const languageMap: { [key: string]: string } = {
    en: "English",
    ml: "Malayalam",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    // Add more languages as needed
};

export const getLanguageName = (languageCode: string | undefined) => {
    return languageCode ? languageMap[languageCode] || languageCode : "Unknown";
};

export const formatVotes = (votes: number = 0): string => {
    if (votes >= 1_000_000) {
        return `${(votes / 1_000_000).toFixed(1)}M`;
    } else if (votes >= 1_000) {
        return `${(votes / 1_000).toFixed(1)}K`;
    }
    return votes.toString();
};


export const extractTime = (isoTimestamp: string | Date): string | null => {
    try {
        const date = new Date(isoTimestamp);

        if (isNaN(date.getTime())) {
            return null;
        }

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const strTime = `${hours}:${minutesStr} ${ampm}`;
        return strTime;
    } catch {
        return null;
    }
};
export const extractDate = (isoTimestamp: string | Date): string | null => {
    try {
        const date = new Date(isoTimestamp);
        if (isNaN(date.getTime())) {
            return null;
        }
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${day} ${month} ${year}`;
    } catch {
        return null;
    }
};


export const convertCentsToINR = (cents: number): string  => {
    const rupees = Math.floor(cents / 100);
    return `${rupees.toLocaleString()}`;
}