"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { TheaterHeader } from "./TheatreHeader"

interface ISeat {
    id: string
    label: string
    type: string
    price: number
    isBooked: boolean
}

interface TheaterSeatingProps {
    showData: {
        movieTitle: string
        theaterName: string
        location: string
        showTime: string
        seatLayout: ISeat[][]
    }
}

export default function TheaterSeating({ showData }: TheaterSeatingProps) {
    const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([])

    const handleSeatSelect = (seat: ISeat) => {
        if (seat.isBooked) return

        setSelectedSeats((prev) =>
            prev.some((s) => s.id === seat.id)
                ? prev.filter((s) => s.id !== seat.id)
                : [...prev, seat]
        )
    }

    const renderSeat = (seat: ISeat) => {
        const isSelected = selectedSeats.some((s) => s.id === seat.id)

        return (
            <button
                key={seat.id}
                className={cn(
                    "w-7 h-7 text-xs border rounded m-0.5 transition-colors",
                    {
                        "bg-gray-200 cursor-not-allowed": seat.isBooked,
                        "bg-green-500 text-white": isSelected,
                        "hover:bg-green-100": !seat.isBooked && !isSelected,
                        "border-gray-300": !seat.isBooked && !isSelected,
                    }
                )}
                disabled={seat.isBooked}
                onClick={() => handleSeatSelect(seat)}
            >
                {seat.label.split("")[1]}
            </button>
        )
    }

    return (
        <div className="mx-auto">
            <TheaterHeader
                movieTitle={showData.movieTitle}
                theaterName={showData.theaterName}
                location={showData.location}
                showTime={showData.showTime}
                selectedSeats={selectedSeats.length}
                onBack={() => console.log("Back clicked")}
                onClose={() => console.log("Close clicked")}
            />

            <div className="p-8">
                <div className="mb-8 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Balcony</div>
                    <div className="text-sm font-medium">Rs. 129.78</div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    {showData.seatLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex items-center">
                            <div className="w-6 text-sm text-muted-foreground">
                                {String.fromCharCode(65 + rowIndex)}
                            </div>
                            <div className="flex gap-4">
                                <div className="flex">{row.slice(0, 7).map(renderSeat)}</div>
                                <div className="flex">{row.slice(7, 17).map(renderSeat)}</div>
                                <div className="flex">{row.slice(17).map(renderSeat)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                        <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <span className="text-sm">Sold</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

