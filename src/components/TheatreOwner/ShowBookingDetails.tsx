import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useParams } from "react-router-dom";
import BookingSeatLayout from "./BookingSeatLayout";
import axiosInstance from "../../axiosInstance";
import theatreOwnerApi from "../../axiosInstance/theatreOwnerApi";

interface ISeat {
    id: string;
    label: string;
    type: string;
    price: number;
    isBooked: boolean;
}

interface IShow {
    showId: string;
    movieTitle: string;
    theatreId?: {
        name: string;
        city: string;
    };
    startTime: Date;
    seatLayout: ISeat[][];
}

interface IBooking {
    _id: string;
    bookingId: string;
    movieTitle: string;
    theatreId: string;
    showTime: Date;
    seats: string[];
    price: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    userDetails: {
        name: string;
        email: string;
    };
}

const ShowBookingDetails = () => {
    const { showId } = useParams<{ showId: string }>();
    const [show, setShow] = useState<IShow | null>(null);
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const [showResponse, bookingsResponse] = await Promise.all([
                    axiosInstance.get(`/user/seat-selection/${showId}`),
                    theatreOwnerApi.get(`/bookedBy/${showId}`)
                ]);

                const showData = {
                    ...showResponse.data.responseData?.show,
                    startTime: new Date(showResponse.data.responseData?.show.startTime),
                };
                setShow(showData);
                setBookings(bookingsResponse.data.responseData);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch show details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [showId]);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-8">{error}</div>;
    }

    if (!show) {
        return <div className="text-center py-8">Show details not available.</div>;
    }

    return (
        <div className="container mx-auto py-4">
            <Card>
                <CardHeader>
                    <CardTitle>{show.movieTitle}</CardTitle>
                    <p>{`Start Time: ${show.startTime.toLocaleString()}`}</p>
                    {show.theatreId && (
                        <p>{`Theatre: ${show.theatreId.name}, ${show.theatreId.city}`}</p>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-col gap-8">
                        <div className="flex-1">
                            <BookingSeatLayout seatLayout={show.seatLayout} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-4">Booked Seats</h3>
                            {bookings.length > 0 ? (
                                <ul className="space-y-4">
                                    {bookings.map((booking) => (
                                        <li key={booking._id} className="border-b pb-2">
                                            <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                                            <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
                                            <p><strong>Price:</strong> ₹{booking.price / 100}</p>
                                            <p><strong>Status:</strong> {booking.status}</p>
                                            <p><strong>User:</strong> {booking.userDetails.email}</p>
                                            <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No bookings for this show yet.</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ShowBookingDetails;

