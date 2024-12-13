import { useState } from "react"
import ShowList from "@/components/TheatreOwner/ShowListPage"
import ShowForm from "@/components/TheatreOwner/ShowForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import theatreOwnerApi from "@/axiosInstance/theatreOwnerApi"
import { useParams } from "react-router-dom"

interface showDataProps {
    movieId: string;
    movieTitle: string;
    startTime: string;
}

export default function ShowManagementPage() {
    const [isAddingShow, setIsAddingShow] = useState(false)
    const { theatreId, screenId } = useParams();


    const handleAddShow = async (showData: showDataProps) => {
        try {
            const response = await theatreOwnerApi.post("/theatre/screen/add-show", {
                theatreId,
                screenId,
                ...showData,
            });
            setIsAddingShow(false);
        } catch (error) {
            console.error("Error adding show:", error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Show Management</h1>
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
            <ShowList />
        </div>
    )
}

