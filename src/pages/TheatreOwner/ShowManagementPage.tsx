import { useCallback, useEffect, useState } from "react"
import ShowForm from "../../components/TheatreOwner/ShowForm"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import theatreOwnerApi from "../../axiosInstance/theatreOwnerApi"
import { Link, useParams } from "react-router-dom"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table"
import { FaEdit, FaTrash } from "react-icons/fa"
import { extractDate, extractTime } from "../../constants"
import { Input } from "../../components/ui/input"
import { Eye } from "lucide-react"

interface showDataProps {
    movieId: string;
    movieTitle: string;
    startTime: string;
}

interface ISeat {
    id: string;
    label: string;
    type: string;
    price: number;
    isBooked: boolean;
}

interface IShow {
    showId: string;
    movieId: string;
    movieTitle: string;
    screenId: string;
    theatreId: string;
    startTime: Date;
    seatLayout: ISeat[][];
}

export default function ShowManagementPage() {
    const today = new Date().toISOString().split('T')[0];
    const [shows, setShows] = useState<IShow[]>([]);
    const [isAddingShow, setIsAddingShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState(today);
    const { theatreId, screenId } = useParams();

    const fetchShows = useCallback(async () => {
        try {
            const response = await theatreOwnerApi.get(`/screen/${screenId}/shows`, {
                params: {
                    search: searchQuery,
                    date: dateFilter
                }
            });
            setShows(response.data.responseData?.shows);
        } catch (error) {
            console.error("Error fetching shows:", error);
        }
    }, [screenId, searchQuery, dateFilter]);

    useEffect(() => {
        fetchShows();
    }, [screenId, searchQuery, dateFilter, fetchShows]);


    const handleAddShow = async (showData: showDataProps) => {
        try {
            await theatreOwnerApi.post("/theatre/screen/add-show", {
                theatreId,
                screenId,
                ...showData,
            });
            // const { show } = data.responseData;
            // setShows((prevShows) => [...prevShows, show]);
            fetchShows();
            setIsAddingShow(false);
        } catch (error) {
            console.error("Error adding show:", error);
        }
    };

    const handleEdit = (show: IShow) => {
        // Implement edit functionality
        console.log("Edit show:", show);
    };

    const handleDelete = async (showId: string) => {
        try {
            await theatreOwnerApi.delete(`/shows/${showId}`);
            setShows(shows.filter(show => show.showId !== showId));
        } catch (error) {
            console.error("Error deleting show:", error);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleDateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);

        setDateFilter(e.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Show Management</h1>

            <div className="w-full flex justify-end px-4">
                <Dialog open={isAddingShow} onOpenChange={setIsAddingShow}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">Add New Show</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Show</DialogTitle>
                        </DialogHeader>
                        <ShowForm onSubmit={handleAddShow} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex space-x-4 mb-4">
                <Input
                    type="text"
                    placeholder="Search shows..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="max-w-sm"
                />
                <Input
                    type="date"
                    value={dateFilter}
                    onChange={handleDateFilter}
                    className="max-w-sm"
                />
            </div>


            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Movie Title</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shows.map((show) => (
                        <TableRow key={show.showId}>
                            <TableCell>{show.movieTitle}</TableCell>
                            <TableCell>{extractDate(show.startTime)} {extractTime(show.startTime)}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(show)}>
                                    <FaEdit className="mr-2" /> Edit
                                </Button>
                                <Button asChild variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(show)}>
                                    <Link to={`/theatreOwner/theatres/showBookingDetails/${show.showId}`} >
                                        <Eye className="mr-2" /> view
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(show.showId)}>
                                    <FaTrash className="mr-2" /> Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

