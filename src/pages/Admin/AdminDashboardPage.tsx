import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Calendar, Ticket, Users } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import adminApi from "@/axiosInstance/adminApi"
import { convertCentsToINR, extractDate, extractTime } from "@/constants"


// Mock data
// const recentBookings = [
//     { id: 1, movie: "Inception", user: "John Doe", date: "2023-06-15", seats: "A1, A2" },
//     { id: 2, movie: "The Dark Knight", user: "Jane Smith", date: "2023-06-14", seats: "B3, B4" },
//     { id: 3, movie: "Interstellar", user: "Bob Johnson", date: "2023-06-13", seats: "C5, C6" },
// ]
interface RecentBookings {
    bookingId: string;  // Unique identifier for the booking
    movieTitle: string; // The title of the movie
    userId: string;     // The ID of the user who made the booking
    showTime: Date;     // The showtime of the movie
}
// interface UpcomingMovies {

// }


const upcomingMovies = [
    { id: 1, title: "Dune: Part Two", releaseDate: "2023-10-20" },
    { id: 2, title: "The Marvels", releaseDate: "2023-11-10" },
]
const AdminDashboardPage = () => {
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [bookings, setBookings] = useState<number>(0);
    const [recentBookings, setRecentBookings] = useState<RecentBookings[]>([]);
    useEffect(() => {
        const fetchTotalRevenue = async () => {
            try {
                const { data } = await adminApi.get('/total-revenue');
                setTotalRevenue(data.responseData?.totalRevenue);
                setBookings(data.responseData?.bookings);
                setRecentBookings(data.responseData?.recentBookings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTotalRevenue();
        const fetchUpcomingMovies = async () => {
            try {
                const response = await adminApi.get('/upcoming-movies');
            } catch (error) {
                console.log(error);
            }
        }

    }, [])
    return (
        <div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{convertCentsToINR(totalRevenue)}</div>
                        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{bookings}</div>
                        {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Movie Screenings</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+03</div>
                        {/* <p className="text-xs text-muted-foreground">+201 from last month</p> */}
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Movie</TableHead>
                                    <TableHead>User Id</TableHead>
                                    <TableHead>Show Time</TableHead>
                                    {/* <TableHead>Seats</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentBookings.map((booking) => (
                                    <TableRow key={booking.bookingId}>
                                        <TableCell>{booking.movieTitle}</TableCell>
                                        <TableCell>{booking.userId}</TableCell>
                                        <TableCell>{extractDate(booking.showTime)}{extractTime(booking.showTime)}</TableCell>
                                        {/* <TableCell>{booking.}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Movies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {upcomingMovies.map((movie) => (
                                <li key={movie.id} className="flex justify-between">
                                    <span>{movie.title}</span>
                                    <span>{movie.releaseDate}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>


        </div>
    )
}

export default AdminDashboardPage