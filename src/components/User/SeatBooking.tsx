"use client"

import { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "../../components/ui/checkbox";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axiosInstance from "../../axiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { Edit2, Users } from 'lucide-react';

interface Wallet {
    balance: number;
}

const stripePromise = loadStripe('pk_test_51QUjWbGpRrmAMBxhHsnuwfIGcv2fiQHVSEmMZ54lQdvRzIAKLOb190Cb5a2lGQyIhA7deJ84U1APVfPy6B1EnKOh00L9Gvy34f');

// Seat Component
interface SeatProps {
    id: string;
    label: string;
    type: string;
    price: number;
    isBooked: boolean;
    isSelected: boolean;
    onSelect: (label: string) => void;
}

const Seat = ({ label, isBooked, isSelected, onSelect }: SeatProps) => {
    if (label === "null") {
        return <div className="w-8 h-8 p-0 m-0.5" />;
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className={`w-8 h-8 p-0 m-0.5 
                ${isBooked ? "bg-gray-200 cursor-not-allowed" :
                    isSelected ? "bg-primary text-primary-foreground" : "hover:bg-primary"}`}
            disabled={isBooked}
            onClick={() => onSelect(label)}
            aria-label={`Seat ${label} ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
        >
            {label}
        </Button>
    );
};

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
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const [useWalletBalance, setUseWalletBalance] = useState(false);
    const { userToken } = useSelector((state: RootState) => state.authReducer);
    const [walletBalance, setWalletBalance] = useState<number>(0);

    const navigate = useNavigate();

    const handleSeatSelect = (seatLabel: string) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatLabel)) {
                return prev.filter((label) => label !== seatLabel);
            }
            if (prev.length < numberOfSeats) {
                return [...prev, seatLabel];
            }
            return prev;
        });
    };
    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const { data } = await axiosInstance.get<{ responseData: Wallet }>('/user/wallet');
                setWalletBalance(data.responseData?.balance || 0);
            } catch (error) {
                console.log(error);
            }
        }
        fetchWallet();
    }, []);
    const getSeatImage = (quantity: number) => {
        if (quantity === 1) {
            return `/public/cycle.png`;
        }
        if (quantity === 2) {
            return `/public/scooter.png`;
        }
        if (quantity <= 7) {
            return `/public/car.png`;
        }
        return `/public/bus.png`;
    };

    const handleSeatQuantitySelect = (quantity: number) => {
        setNumberOfSeats(quantity);
    };

    const handleSelectSeats = () => {
        setIsModalOpen(false);
    };

    const getTotalPrice = () =>
        selectedSeats.reduce((total, seatLabel) => {
            for (const row of show.seatLayout) {
                const seat = row.find((s) => s.label === seatLabel);
                if (seat) total += seat.price;
            }
            return total;
        }, 0);

    const handleBooking = async () => {
        setIsProcessing(true);

        try {
            if (!userToken) {
                return navigate("/login");
            }

            const totalPrice = getTotalPrice();
            const amountToCharge = useWalletBalance
                ? Math.max(0, totalPrice - walletBalance)
                : totalPrice;

            const response = await axiosInstance.post("/user/book-seat", {
                showId: show.showId,
                selectedSeats,
                useWalletBalance,
                amountToCharge,
            });

            const { sessionId } = response.data.responseData;

            if (amountToCharge > 0) {
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
            } else {
                // Handle successful booking without Stripe payment
                // const response = await axiosInstance.post("/user/book-seat", {
                //     showId: show.showId,
                //     selectedSeats,
                //     useWalletBalance,
                //     amountToCharge,
                // })
            }
        } catch (error) {
            console.error("Booking error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center">How Many Seats?</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-6 py-4">
                        <div className="relative w-40 h-40 rounded-lg overflow-hidden">
                            <img
                                src={getSeatImage(numberOfSeats || 1)}
                                alt={`${numberOfSeats || 1} seats`}
                                className="w-40 h-auto object-contain"
                            />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <Button
                                    key={num}
                                    variant={numberOfSeats === num ? "default" : "outline"}
                                    className="w-10 h-10 p-0"
                                    onClick={() => handleSeatQuantitySelect(num)}
                                >
                                    {num}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSelectSeats} disabled={numberOfSeats === 0}>
                            Select Seats
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="mx-auto rounded-lg shadow-md mb-20">
                <CardHeader className="text-center border-b p-4">
                    <CardTitle className="text-2xl font-bold">{show.movieTitle}</CardTitle>
                    <div className="flex justify-between items-center mt-2">
                        <div className="text-left">
                            <p className="text-sm">{show.theatreId?.name}, {show.theatreId?.city}</p>
                            <p className="text-sm text-muted-foreground">
                                {format(new Date(show.startTime), "dd MMM, hh:mm a")}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                                <Users className="w-4 h-4 mr-1" />
                                {numberOfSeats} seats
                            </Badge>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-1"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit seats
                            </Button>
                        </div>
                    </div>
                </CardHeader>

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
                                    {String.fromCharCode(65 + rowIndex)}
                                </span>
                                <div className="flex flex-wrap">
                                    {row.map((seat) => (
                                        <Seat
                                            key={seat.id}
                                            {...seat}
                                            isSelected={selectedSeats.includes(seat.label)}
                                            onSelect={handleSeatSelect}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
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
            </div>

            {selectedSeats.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
                    <div className="max-w-4xl mx-auto flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">
                                    Selected Seats: {selectedSeats.join(", ")}
                                </p>
                                <p className="text-lg font-bold">Total: ₹{getTotalPrice()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="use-wallet"
                                    checked={useWalletBalance}
                                    onCheckedChange={(checked) => setUseWalletBalance(checked as boolean)}
                                />
                                <label
                                    htmlFor="use-wallet"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Use Wallet Balance (₹{walletBalance / 100})
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            {useWalletBalance && (
                                <div className="text-sm">
                                    <p>Wallet: ₹{Math.min(walletBalance / 100, getTotalPrice())}</p>
                                    <p>To Pay: ₹{Math.max(0, getTotalPrice() - walletBalance / 100)}</p>
                                </div>
                            )}
                            <Button
                                size="lg"
                                disabled={selectedSeats.length !== numberOfSeats || isProcessing}
                                onClick={handleBooking}
                            >
                                {isProcessing ? "Processing..." : "Book Tickets"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SeatBooking;