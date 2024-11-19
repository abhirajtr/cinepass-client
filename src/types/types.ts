export interface Movie {
    id: number;
    title: string;
    image: string;
    rating?: number;
    duration?: string;
    releaseDate?: string;
}

export interface Cinema {
    id: number;
    name: string;
    address: string;
}