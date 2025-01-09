import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from "react"
import { QRCodeSVG } from 'qrcode.react'
import axiosInstance from "../../axiosInstance"
import { Button } from "../../components/ui/button"
import { jsPDF } from "jspdf"
import { Table, TableBody, TableCell, TableRow } from "../../components/ui/table"
import { CancelConfirmationModal } from "../../components/User/CancelConfirmationModal"

interface Booking {
    bookingId: string
    movieTitle: string
    theatreId: {
        theatreId: string;
        name: string;
        city: string;
    };
    showTime: string
    seats: string[]
    price: number
    status: 'confirmed' | 'cancelled'
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}

const ITEMS_PER_PAGE = 5;

const isCancellable = (showTime: string): boolean => {
    const now = new Date();
    const showDateTime = new Date(showTime);
    return showDateTime > now;
};


export default function BookingHistoryPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBookingHistory();
    }, []);

    const cancelTicket = async (bookingId: string) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.patch(`/user/cancel-booking/${bookingId}`);
            console.log(response);

            // Refresh booking history after cancellation
            // await fetchBookingHistory();
            setCancelModalOpen(false);
            // setSelectedBooking(null);
        } catch (error) {
            console.error("Error cancelling ticket:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchBookingHistory = async () => {
        try {
            const response = await axiosInstance.get("/user/booking-history");
            setBookings(response.data.responseData?.bookings);
        } catch (error) {
            console.error("Error fetching booking history:", error);
        }
    };

    const generateQRCodeData = (booking: Booking) => {
        const qrData = {
            bookingId: booking.bookingId,
            movieTitle: booking.movieTitle,
            theatre: booking.theatreId.name,
            city: booking.theatreId.city,
            showTime: booking.showTime,
            seats: booking.seats,
            price: booking.price / 100,
            status: booking.status
        };
        return JSON.stringify(qrData);
    };

    const generateTicket = (booking: Booking) => {
        const doc = new jsPDF();

        // Set up the document
        doc.setFontSize(22);
        doc.setTextColor(0, 0, 0);
        doc.text("Movie Ticket", 105, 20, { align: "center" });

        // Add movie title
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text(booking.movieTitle, 105, 35, { align: "center" });

        // Add booking details
        doc.setFontSize(12);
        doc.setTextColor(52, 73, 94);

        const details = [
            { label: "Theatre", value: `${booking.theatreId.name}, ${booking.theatreId.city}` },
            { label: "Date & Time", value: formatDate(booking.showTime) },
            { label: "Seats", value: booking.seats.join(", ") },
            { label: "Booking ID", value: booking.bookingId },
            { label: "Price", value: `₹${booking.price / 100}` },
            { label: "Status", value: booking.status }
        ];

        details.forEach((detail, index) => {
            doc.text(`${detail.label}:`, 20, 50 + (index * 10));
            doc.text(detail.value, 70, 50 + (index * 10));
        });

        // Add QR Code
        const qrCodeSvg = document.getElementById(`qr-${booking.bookingId}`) as unknown as SVGSVGElement;
        if (qrCodeSvg) {
            const svgData = new XMLSerializer().serializeToString(qrCodeSvg);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const imgData = canvas.toDataURL("image/png");
                doc.addImage(imgData, 'PNG', 140, 50, 50, 50);
                doc.save(`ticket-${booking.bookingId}.pdf`);
            };
            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        } else {
            doc.save(`ticket-${booking.bookingId}.pdf`);
        }
    };

    const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBookings = bookings.slice(startIndex, endIndex);

    const handleCancelClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setCancelModalOpen(true);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Ticket Booking History</h1>
            <div className="grid gap-6">
                {currentBookings.map((booking) => (
                    <Card key={booking.bookingId} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-grow p-6">
                                <CardHeader className="p-0 mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <CardTitle className="text-2xl">{booking.movieTitle}</CardTitle>
                                        <Badge variant={
                                            booking.status === 'confirmed' ? 'secondary' : 'destructive'
                                        }>
                                            {booking.status}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-lg">{booking.theatreId.name}, {booking.theatreId.city}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Date & Time</TableCell>
                                                <TableCell>{formatDate(booking.showTime)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Seats</TableCell>
                                                <TableCell>{booking.seats.join(", ")}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Price</TableCell>
                                                <TableCell>₹{booking.price / 100}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Booking ID</TableCell>
                                                <TableCell>{booking.bookingId}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </div>
                            <div className="bg-muted p-6 flex flex-col items-center justify-center space-y-4">
                                <div className="bg-white p-2 rounded-lg">
                                    <QRCodeSVG
                                        id={`qr-${booking.bookingId}`}
                                        value={generateQRCodeData(booking)}
                                        size={128}
                                        level="M"
                                        includeMargin
                                    />
                                </div>
                                {booking.status === "confirmed" &&
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => generateTicket(booking)}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Ticket
                                    </Button>
                                }
                                {isCancellable(booking.showTime) && booking.status === 'confirmed' && (
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => handleCancelClick(booking)}
                                    >
                                        Cancel Ticket
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {selectedBooking && (
                <CancelConfirmationModal
                    isOpen={cancelModalOpen}
                    onClose={() => {
                        setCancelModalOpen(false);
                        setSelectedBooking(null);
                    }}
                    onConfirm={() => cancelTicket(selectedBooking.bookingId)}
                    showTime={selectedBooking.showTime}
                    isLoading={isLoading}
                />
            )}
        </div>
    )
}

