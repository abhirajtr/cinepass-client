import { useState } from "react";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axiosInstance from "../../axiosInstance.ts";
import { loadStripe } from "@stripe/stripe-js"
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe('pk_test_51QUjWbGpRrmAMBxhHsnuwfIGcv2fiQHVSEmMZ54lQdvRzIAKLOb190Cb5a2lGQyIhA7deJ84U1APVfPy6B1EnKOh00L9Gvy34f'); 
// Seat Component
interface SeatProps {
    id: string;
    label: string;
    type: string;
    price: number;
    isBooked: boolean;
    isSelected: boolean;
    onSelect: (label: string) => void; // Change parameter to label
}

const Seat = ({ label, isBooked, isSelected, onSelect }: SeatProps) => {
    if (label === "null") {
        return <div className="w-8 h-8 p-0 m-0.5" />; // Placeholder for spacing
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className={`w-8 h-8 p-0 m-0.5 
                ${isBooked ? "bg-gray-200 cursor-not-allowed" :
                    isSelected ? "bg-primary text-primary-foreground" : "hover:bg-primary"}`}
            disabled={isBooked}
            onClick={() => onSelect(label)} // Pass label instead of id
            aria-label={`Seat ${label} ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
        >
            {label}
        </Button>
    );
};

// Show Props and Main SeatBooking Component
interface ShowProps {
    show: {
        showId: string;
        movieTitle: string;
        theatreId?: {
            name: string;
            city: string;
        };
        startTime: Date;
        seatLayout: {
            id: string;
            label: string;
            type: string;
            price: number;
            isBooked: boolean;
        }[][];
    };
}

const SeatBooking = ({ show }: ShowProps) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Track seat labels
    const [isProcessing, setIsProcessing] = useState(false);
    const { userToken } = useSelector((state: RootState) => state.authReducer);
    const navigate = useNavigate();

    // Handle seat selection
    const handleSeatSelect = (seatLabel: string) => {
        setSelectedSeats((prev) =>
            prev.includes(seatLabel) ? prev.filter((label) => label !== seatLabel) : [...prev, seatLabel]
        );
    };

    // Calculate total price
    const getTotalPrice = () =>
        selectedSeats.reduce((total, seatLabel) => {
            for (const row of show.seatLayout) {
                const seat = row.find((s) => s.label === seatLabel); // Search by label
                if (seat) total += seat.price;
            }
            return total;
        }, 0);

    // Handle booking
    const handleBooking = async () => {
        setIsProcessing(true);
    
        try {
            if (!userToken){
                return navigate("/login");
            }
            const response = await axiosInstance.post("/user/book-seat", {
                showId: show.showId,
                selectedSeats,
            });
    
            const { sessionId } = response.data.responseData; // Assuming your API returns {responseData: {sessionId}}
    
            if (!sessionId) {
                throw new Error("Failed to retrieve payment details.");
            }
    
            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error("Stripe failed to load.");
            }
    
            const result = await stripe.redirectToCheckout({ sessionId });
            if (result?.error) {
                throw new Error(`Stripe redirect failed: ${result.error.message}`);
            }
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="mx-auto rounded-lg shadow-md">
            {/* Header Section */}
            <CardHeader className="text-center border-b p-4">
                <CardTitle className="text-2xl font-bold">{show.movieTitle}</CardTitle>
                <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                    <span>
                        {show.theatreId?.name}, {show.theatreId?.city}
                    </span>
                    <Badge variant="outline">
                        {format(new Date(show.startTime), "dd MMM, hh:mm a")}
                    </Badge>
                </div>
            </CardHeader>

            {/* Seat Layout Section */}
            <CardContent className="p-6">
                <div className="mb-8 text-center">
                    <div className="w-full flex items-center justify-center">
                        <div className="w-2/4 bg-primary/50 rounded-md mb-2 text-center">Screen</div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    {show.seatLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-1 items-center">
                            <span className="w-6 text-center text-sm text-muted-foreground">
                                {String.fromCharCode(65 + rowIndex)} {/* Row labels A, B, C */}
                            </span>
                            <div className="flex flex-wrap">
                                {row.map((seat) => (
                                    <Seat
                                        key={seat.id}
                                        {...seat}
                                        isSelected={selectedSeats.includes(seat.label)} // Check by label
                                        onSelect={handleSeatSelect}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Seat Legend */}
                <div className="mt-8 flex gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border rounded" />
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-primary rounded" />
                        <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded" />
                        <span>Booked</span>
                    </div>
                </div>
            </CardContent>

            {/* Footer Section */}
            <CardFooter className="flex justify-between border-t p-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Selected Seats: {selectedSeats.length}
                    </p>
                    <p className="text-lg font-bold">Total: ₹{getTotalPrice()}</p>
                </div>
                <Button
                    size="lg"
                    disabled={selectedSeats.length === 0 || isProcessing}
                    onClick={handleBooking}
                >
                    {isProcessing ? "Processing..." : "Book Tickets"}
                </Button>
            </CardFooter>
        </div>
    );
}

export default SeatBooking;