'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Eye, Edit } from 'lucide-react'
import ViewTheatreDetailsModal from './TheatreOwner/ViewTheatreDetailsModal'
// import ViewDetailsModal from './ViewDetailsModal'

interface TheatreCardProps {
    theatre: {
        theatreId: string;
        theatreName: string;
        contactEmail: string;
        contactNumber: string;
        streetAddress: string;
        city: string;
        state: string;
        zipCode: string;
        status: string;
    }
}

export default function TheatreCard({ theatre }: TheatreCardProps) {
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
    const { status } = theatre;
    const badgeVariant = status === "pending" ? 'secondary' : status === "rejected" ? "destructive" : "default";
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {theatre.theatreName}
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
                    <p className="text-sm text-muted-foreground">{theatre.contactNumber}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Config
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsViewDetailsOpen(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </Button>
                    <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
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