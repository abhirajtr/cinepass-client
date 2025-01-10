import { ArrowLeft, X } from 'lucide-react'
import { Button } from "../../components/ui/button"

interface TheaterHeaderProps {
    movieTitle: string
    theaterName: string
    location: string
    showTime: string
    selectedSeats: number
    onBack: () => void
    onClose: () => void
}

export function TheaterHeader({
    movieTitle,
    theaterName,
    location,
    showTime,
    selectedSeats,
    onBack,
    onClose,
}: TheaterHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 mx-4">
                <h2 className="text-lg font-semibold">{movieTitle}</h2>
                <p className="text-sm text-muted-foreground">
                    {theaterName}: {location} | {showTime}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-sm">
                    <span className="font-semibold">{selectedSeats}</span> Tickets
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}

