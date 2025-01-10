import { cn } from "../../lib/utils"

interface SeatLayoutProps {
    bookedSeats: string[]
}

export function SeatLayout({ bookedSeats }: SeatLayoutProps) {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const seatsPerRow = 10

    return (
        <div className="p-4">
            <div className="mb-4 text-center">Screen</div>
            <div className="border-t-4 border-gray-300 mb-8"></div>
            <div className="grid gap-4">
                {rows.map((row) => (
                    <div key={row} className="flex justify-center space-x-2">
                        {Array.from({ length: seatsPerRow }, (_, i) => {
                            const seatNumber = `${row}${i + 1}`
                            const isBooked = bookedSeats.includes(seatNumber)
                            return (
                                <div
                                    key={seatNumber}
                                    className={cn(
                                        "w-8 h-8 flex items-center justify-center text-xs font-semibold rounded",
                                        isBooked
                                            ? "bg-red-500 text-white cursor-not-allowed"
                                            : "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                                    )}
                                >
                                    {seatNumber}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

