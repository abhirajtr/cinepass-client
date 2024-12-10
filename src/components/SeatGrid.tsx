import { Card, CardContent } from "@/components/ui/card"
import { Seat, SeatType, SeatTier } from '@/types/types';

interface SeatGridProps {
    screenName: string;
    seats: Seat[][];
    columns: number;
    handleSeatClick: (rowIndex: number, colIndex: number, selectedType: SeatType) => void;
    selectedType: SeatType;
    seatTiers: SeatTier[];
}

export const SeatGrid: React.FC<SeatGridProps> = ({
    screenName,
    seats,
    columns,
    handleSeatClick,
    selectedType,
    seatTiers,
}) => {
    const getColorForSeatType = (type: SeatType) => {
        if (type === 'disabled') return 'bg-muted text-muted-foreground';
        const tier = seatTiers.find(t => t.name.toLowerCase() === type.toLowerCase());
        return tier ? tier.color : 'bg-gray-300';
    };

    return (
        <Card className="flex-grow">
            <CardContent>
                <div className="pl-6 mt-2">
                    <div className="mb-8 bg-destructive h-8 rounded-t-lg flex items-center justify-center text-white font-bold">
                        <span className="uppercase tracking-wide">{screenName || "Screen"}</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="inline-grid gap-2 mb-4" style={{ gridTemplateColumns: `auto repeat(${columns}, minmax(0, 1fr))` }}>
                        {seats.map((row, rowIndex) => (
                            <>
                                <div key={`row-${rowIndex}`} className="flex items-center justify-center font-bold">
                                    {String.fromCharCode(65 + rowIndex)}
                                </div>
                                {row.map((seat) => (
                                    <button
                                        key={seat.id}
                                        className={`h-6 w-6 rounded text-xs flex items-center justify-center ${getColorForSeatType(seat.type)}`}
                                        onClick={() => handleSeatClick(rowIndex, parseInt(seat.id.split('-')[1]), selectedType)}
                                        aria-label={`Seat ${seat.label}`}
                                    >
                                        {seat.label}
                                    </button>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

