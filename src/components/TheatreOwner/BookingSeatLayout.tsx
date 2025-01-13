import { Badge } from "@/components/ui/badge";

interface ISeat {
    id: string;
    label: string;
    type: string;
    price: number;
    isBooked: boolean;
}

interface SeatLayoutProps {
    seatLayout: ISeat[][];
}

export default function BookingSeatLayout({ seatLayout }: SeatLayoutProps) {
    return (
        <>
            <div className="flex justify-center mb-4">
                <div className="w-3/4 h-8 bg-gray-300 rounded-lg text-center text-sm leading-8">Screen</div>
            </div>
            <div className="grid gap-4">
                {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                        <span className="text-sm font-medium w-6 text-right">
                            {String.fromCharCode(65 + rowIndex)}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {row.map((seat) =>
                                seat.type === "disabled" ? (
                                    <div
                                        key={seat.id}
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                    ></div>
                                ) : (
                                    <div
                                        key={seat.id}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded ${
                                            seat.isBooked 
                                                ? "bg-secondary text-secondary-foreground" 
                                                : "bg-primary/20 text-primary"
                                        }`}
                                    >
                                        {seat.label}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <Badge variant="outline" className="gap-2">
                    <div className="w-4 h-4 rounded bg-primary/20"></div>
                    Available
                </Badge>
                <Badge variant="outline" className="gap-2">
                    <div className="w-4 h-4 rounded bg-secondary"></div>
                    Booked
                </Badge>
            </div>
        </>
    );
}

