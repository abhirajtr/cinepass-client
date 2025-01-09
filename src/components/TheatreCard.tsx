'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, ScreenShare } from 'lucide-react'
import ViewTheatreDetailsModal from './TheatreOwner/ViewTheatreDetailsModal'
import { useNavigate } from 'react-router-dom'
// import ViewDetailsModal from './ViewDetailsModal'

interface TheatreCardProps {
    theatre: {
        theatreId: string;
        ownerId: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        licenseNumber: string;
        verificationDocument: string;
        status: string;
    }
}

export default function TheatreCard({ theatre }: TheatreCardProps) {
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
    const { status } = theatre;
    const navigate = useNavigate();
    const badgeVariant = status === "pending" ? 'pending' : status === "rejected" ? "rejected" : "verified";
    return (
        <>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {theatre.name}
                    </CardTitle>
                    <Badge variant={badgeVariant}>
                        {theatre.status}
                    </Badge>
                    {/* <Badge variant={theatre.status ? "default" : "secondary"}>
                        {theatre.status ? "Verified" : "Pending"}
                    </Badge> */}
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{theatre.city}, {theatre.state}</p>
                    <p className="text-sm text-muted-foreground">{theatre.phone}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate(`${theatre.theatreId}/screens`)} disabled={theatre.status !== "verified"} >
                        <ScreenShare className="mr-2 h-4 w-4" />
                        Screen
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsViewDetailsOpen(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Button>
                    <Button onClick={() => navigate(`${theatre.theatreId}/edit`)} >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>

                    {/* <Button variant="outline" size="sm" asChild>
                    </Button> */}
                </CardFooter>
            </Card>
            <ViewTheatreDetailsModal
                theatre={theatre}
                isOpen={isViewDetailsOpen}
                onClose={() => setIsViewDetailsOpen(false)}
            />
        </>
    )
}