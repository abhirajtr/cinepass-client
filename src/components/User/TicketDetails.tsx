import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { useEffect } from 'react'
import { Separator } from '../ui/separator'

const TicketPage = () => {
    const ticketDetails = {
        movie: "Inception",
        theatre: "Cineplex Odeon",
        screen: "IMAX Screen 1",
        seats: ["A1", "A2", "A3"],
        bookingId: "INCEP12345",
        posterUrl: "https://example.com/inception-poster.jpg"
    }

    useEffect(() => {

    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Your Ticket Details</h1>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={ticketDetails.posterUrl} alt={ticketDetails.movie} />
                            <AvatarFallback>{ticketDetails.movie.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{ticketDetails.movie}</CardTitle>
                            <p className="text-sm text-muted-foreground">{ticketDetails.theatre}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Screen</h3>
                            <p>{ticketDetails.screen}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-semibold">Seats</h3>
                            <p>{ticketDetails.seats.join(', ')}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-semibold">Booking ID</h3>
                            <Badge variant="secondary">{ticketDetails.bookingId}</Badge>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    {/* <QRCode value={bookingId} size={128} /> */}
                    <img src="" alt="" />
                </CardFooter>
            </Card>
        </div>
    )
}

export default TicketPage;