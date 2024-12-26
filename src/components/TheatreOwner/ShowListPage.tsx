import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FaEdit, FaTrash } from "react-icons/fa"
import theatreOwnerApi from "@/axiosInstance/theatreOwnerApi"
import { useParams } from 'react-router-dom'

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

export default function ShowList() {
    const [shows, setShows] = useState<IShow[]>([]);

    const { screenId } = useParams();

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await theatreOwnerApi.get(`/screen/${screenId}/shows`);
                setShows(response.data.responseData?.shows)
            } catch (error) {
                console.error("Error fetching shows:", error)
            }
        }
        fetchShows()
    }, [screenId])

    const handleEdit = (show: IShow) => {
        // Implement edit functionality
        console.log("Edit show:", show)
    }

    const handleDelete = async (showId: string) => {
        try {
            await theatreOwnerApi.delete(`/shows/${showId}`)
            setShows(shows.filter(show => show.showId !== showId))
        } catch (error) {
            console.error("Error deleting show:", error)
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Movie Title</TableHead>
                    {/* <TableHead>Theatre</TableHead> */}
                    {/* <TableHead>Screen</TableHead> */}
                    <TableHead>Start Time</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {shows.map((show) => (
                    <TableRow key={show.showId}>
                        <TableCell>{show.movieTitle}</TableCell>
                        {/* <TableCell>{show.theatreId}</TableCell> */}
                        {/* <TableCell>{show.screenId}</TableCell> */}
                        <TableCell>{new Date(show.startTime).toLocaleString()}</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(show)}>
                                <FaEdit className="mr-2" /> Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(show.showId)}>
                                <FaTrash className="mr-2" /> Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

