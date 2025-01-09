import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance.ts";
import { useParams } from "react-router-dom";
import SeatBooking from "../../components/User/SeatBooking";


// Define the types for Show and Seat
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

export default function SeatSelectionPage() {
    const { showId } = useParams<{ showId: string }>(); // Get showId from URL params
    const [show, setShow] = useState<IShow | null>(null); // State to store the show data
    const [loading, setLoading] = useState(true); // Loading state



    // Fetch show details from the backend
    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axiosInstance.get(`/user/seat-selection/${showId}`);
                console.log(response);

                setShow(response.data.responseData?.show); // Set the fetched show data to state
            } catch (error) {
                console.error("Error fetching show details:", error);
            } finally {
                setLoading(false); // Set loading to false after request is done
            }
        };

        if (showId) {
            fetchShowDetails(); // Fetch data if showId is available
        }
    }, [showId]);

    // Show loading indicator while fetching data
    if (loading) {
        return <div className="container py-2">Loading...</div>;
    }

    // If no show data, return an error message
    if (!show) {
        return <div className="container py-2">No show details found.</div>;
    }

    return (
        <div className="container py-2">
            {/* <h1 className="text-2xl font-bold mb-4">{show.movieTitle}</h1> */}
            {/* <p>{new Date(show.startTime).toLocaleString()}</p> */}
            <SeatBooking show={show} /> {/* Pass the fetched show data to the SeatBooking component */}
        </div>
    );
}
