'use client'

import { useEffect, useState } from 'react'
// import { PlusCircle } from 'lucide-react'
// import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import TheatreCard from '@/components/TheatreCard'
import AddTheatreButton from '@/components/TheatreOwner/AddTheatreButton'
import AddTheatreForm from '@/components/TheatreOwner/AddTheatreForm'
import { AxiosError } from 'axios'
import { backendUrl } from '@/constants'
import { toast } from 'sonner'
import theatreOwnerApi from '@/axiosInstance/theatreOwnerApi'
// import TheatreCard from './TheatreCard'
// import AddTheatreButton from './AddTheatreButton'
// import AddTheatreForm from './AddTheatreForm'

interface Theatre {
    theatreId: string;
    theatreName: string;
    contactEmail: string;
    contactNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    verificationDocument: string;
    status: string;
}

export interface AddTheatre {
    theatreName: string;
    contactEmail: string;
    contactNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    verificationDocument: File | null;
}


const TheatresPageTheatreOwner = () => {
    const [theatres, setTheatres] = useState<Theatre[]>([])
    const [isAddingTheatre, setIsAddingTheatre] = useState(false);


    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const response = await theatreOwnerApi.get("/getAllTheatres");
                setTheatres(response.data.responseData.theatres);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.responseMessage || "An unexpected error occured");
                }
                console.log(error);
            }
        }
        fetchTheatres();
    }, []);
    const handleAddTheatre = async (newTheatre: AddTheatre) => {
        if (!newTheatre.verificationDocument) {
            alert("Verification document is required.");
            return;
        }
        const formData = new FormData();
        formData.append("theatreName", newTheatre.theatreName);
        formData.append("contactEmail", newTheatre.contactEmail);
        formData.append("contactNumber", newTheatre.contactNumber);
        formData.append("streetAddress", newTheatre.streetAddress);
        formData.append("city", newTheatre.city);
        formData.append("state", newTheatre.state);
        formData.append("zipCode", newTheatre.zipCode);
        formData.append("verificationDocument", newTheatre.verificationDocument);
        try {
            console.log("New Theatre Data:", newTheatre);

            const response = await theatreOwnerApi.post(`${backendUrl}/theatreOwner/theatres/add`, formData);
            setTheatres((prevTheatres) => [...prevTheatres, response.data.theatre]);
            console.log(response);
            toast.success(response.data.responseMessage);
            setIsAddingTheatre(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occured");
            }
            console.log(error);
        }
        // setTheatres([...theatres, { ...newTheatre, id: Date.now().toString() }])
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Theatres</h1>
                <AddTheatreButton onClick={() => setIsAddingTheatre(true)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {theatres.map((theatre) => (
                    <TheatreCard key={theatre.theatreId} theatre={theatre} />
                ))}
            </div>
            {isAddingTheatre && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-lg w-full max-w-md">
                        <ScrollArea className="h-[80vh]">
                            <AddTheatreForm onSubmit={handleAddTheatre} onCancel={() => setIsAddingTheatre(false)} />
                        </ScrollArea>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TheatresPageTheatreOwner;