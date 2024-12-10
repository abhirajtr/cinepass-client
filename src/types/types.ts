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

export interface Theatre {
    theatreId: string
    ownerId: string
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    licenseNumber: string
    verificationDocument: string
    status: string
}

export type SeatType = 'standard' | 'disabled' | string;

export interface Seat {
    id: string;
    type: SeatType;
    label: string;
}

export interface SeatTier {
    name: string;
    price: number;
    color: string;
}

export interface ScreenConfigProps {
    theatreId: string;
}

export const generateColor = (index: number): string => {
    const hue = (index * 137.5) % 360;
    return `hsl(${hue}, 70%, 60%)`;
};