import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, TicketIcon } from 'lucide-react'
import { useEffect, useState } from "react"
import axiosInstance from "@/axiosInstance"

interface Booking {
    bookingId: string
    movieTitle: string
    theatreId: {
        theatreId: string;
        name: string;
        city: string;
    };
    showTime: string
    seats: string[]
    price: number
}

// const bookings: Booking[] = [
//     {
//         bookingId: "123",
//         movieTitle: "Inception",
//         theatre: "Cinema Hall A",
//         showTime: "2024-12-25T19:00:00Z",
//         seats: ["A1", "A2"],
//         price: 500
//     },
//     {
//         bookingId: "124",
//         movieTitle: "Avatar",
//         theatre: "Cinema Hall B",
//         showTime: "2024-12-26T20:00:00Z",
//         seats: ["B1", "B2", "B3"],
//         price: 750
//     }
// ]

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}

export default function BookingHistoryPage() {
    const [booking, setBooking] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const response = await axiosInstance.get("/user/booking-history");
                console.log(response);
                
                setBooking(response.data.responseData?.bookings);
                console.log(booking);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchBookingHistory();
    }, []);
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Ticket Booking History</h1>
            <div className="grid gap-3">
                {booking.map((booking) => (
                    <Card key={booking.bookingId} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{booking.movieTitle}</CardTitle>
                            <CardDescription>{booking.theatreId.name} {booking.theatreId.city}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="flex items-center mb-2">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span>{formatDate(booking.showTime)}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <MapPinIcon className="mr-2 h-4 w-4" />
                                <span>{booking.theatreId.city}</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <TicketIcon className="mr-2 h-4 w-4" />
                                <span>{booking.seats.join(", ")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <Badge variant="secondary">Booking ID: {booking.bookingId}</Badge>
                                <span className="font-bold">₹{booking.price / 100}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

