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


// Mock data
const recentBookings = [
    { id: 1, movie: "Inception", user: "John Doe", date: "2023-06-15", seats: "A1, A2" },
    { id: 2, movie: "The Dark Knight", user: "Jane Smith", date: "2023-06-14", seats: "B3, B4" },
    { id: 3, movie: "Interstellar", user: "Bob Johnson", date: "2023-06-13", seats: "C5, C6" },
]

const upcomingMovies = [
    { id: 1, title: "Dune: Part Two", releaseDate: "2023-10-20" },
    { id: 2, title: "The Marvels", releaseDate: "2023-11-10" },
    { id: 3, title: "Oppenheimer", releaseDate: "2023-07-21" },
]
const AdminDashboardPage = () => {
    return (
        <div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹45,231.89</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
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
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">+201 from last month</p>
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
                                    <TableHead>User</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Seats</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentBookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>{booking.movie}</TableCell>
                                        <TableCell>{booking.user}</TableCell>
                                        <TableCell>{booking.date}</TableCell>
                                        <TableCell>{booking.seats}</TableCell>
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