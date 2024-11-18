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

const initialTheatres: Theatre[] = [
    {
        theatreId: "TH001",
        theatreName: "Cineplex Kochi",
        contactEmail: "contact@cineplexkochi.com",
        contactNumber: "+91 9876543210",
        streetAddress: "MG Road",
        city: "Kochi",
        state: "Kerala",
        zipCode: "682016",
        verificationDocument: "document_kochi.pdf",
        status: "rejected",
    },
    {
        theatreId: "TH002",
        theatreName: "Trivandrum Cinemas",
        contactEmail: "info@trivandrumcinemas.com",
        contactNumber: "+91 9988776655",
        streetAddress: "Thampanoor",
        city: "Thiruvananthapuram",
        state: "Kerala",
        zipCode: "695001",
        verificationDocument: "document_trivandrum.pdf",
        status: "verified",
    },
    {
        theatreId: "TH003",
        theatreName: "Malabar Movies",
        contactEmail: "support@malabarmovies.com",
        contactNumber: "+91 8899776655",
        streetAddress: "Calicut Beach Road",
        city: "Kozhikode",
        state: "Kerala",
        zipCode: "673032",
        verificationDocument: "document_kozhikode.pdf",
        status: "pending",
    },
    {
        theatreId: "TH004",
        theatreName: "Kannur Cinemax",
        contactEmail: "hello@kannurcinemax.com",
        contactNumber: "+91 7788991122",
        streetAddress: "Fort Road",
        city: "Kannur",
        state: "Kerala",
        zipCode: "670001",
        verificationDocument: "document_kannur.pdf",
        status: "pending",
    },
    {
        theatreId: "TH005",
        theatreName: "Thrissur Silver Screens",
        contactEmail: "contact@thrissursilverscreens.com",
        contactNumber: "+91 8877665544",
        streetAddress: "Swaraj Round",
        city: "Thrissur",
        state: "Kerala",
        zipCode: "680001",
        verificationDocument: "document_thrissur.pdf",
        status: "verified",
    },
    {
        theatreId: "TH006",
        theatreName: "Alappuzha Talkies",
        contactEmail: "info@alappuzhatalkies.com",
        contactNumber: "+91 7766554433",
        streetAddress: "Beach Road",
        city: "Alappuzha",
        state: "Kerala",
        zipCode: "688001",
        verificationDocument: "document_alappuzha.pdf",
        status: "pending",
    },
    {
        theatreId: "TH007",
        theatreName: "Palakkad Cinemas",
        contactEmail: "admin@palakkadcinemas.com",
        contactNumber: "+91 6655443322",
        streetAddress: "Stadium Bus Stand Road",
        city: "Palakkad",
        state: "Kerala",
        zipCode: "678001",
        verificationDocument: "document_palakkad.pdf",
        status: "rejected",
    },
];


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
    const [theatres, setTheatres] = useState<Theatre[]>(initialTheatres)
    const [isAddingTheatre, setIsAddingTheatre] = useState(false);

    
    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const response = await theatreOwnerApi.get("/getAllTheatres");
                setTheatres(response.data.theatres);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("An unexpected error occured");
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
            toast.success(response.data.message);
            setIsAddingTheatre(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            } else {
                toast.error("An unexpected error occured");
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