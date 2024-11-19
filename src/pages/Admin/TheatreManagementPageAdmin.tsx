import TheatresTable from "@/components/Admin/TheatresTable";
import { useState } from "react";

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

const TheatreManagementPageAdmin = () => {
    const [theatres, setTheatres] = useState<Theatre[]>(initialTheatres);
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-5">Theatre Management</h1>
            <div className="rounded-md border">
                <TheatresTable theatre={theatres} />
            </div>
        </div>
    )
}

export default TheatreManagementPageAdmin;