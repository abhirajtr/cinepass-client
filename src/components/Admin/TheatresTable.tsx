import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from 'lucide-react'
import ViewTheatreDetailsModal from './ViewTheatreDetailsModal'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Theatre } from '@/types/types'


interface TheatresTableProps {
    theatres: Theatre[];
    onVerify: (theatreId: string) => void
    onReject: (theatreId: string, reason: string) => void
}

const TheatresTable: React.FC<TheatresTableProps> = ({ theatres, onVerify, onReject }) => {
    const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (theatre: Theatre) => {
        setSelectedTheatre(theatre)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedTheatre(null)
        setIsModalOpen(false)
    }





    return (
        <div className="overflow-x-auto">
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Theatre Name</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead className="hidden lg:table-cell">Contact</TableHead>
                        <TableHead>License No</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {theatres.map((theatre) => (
                        <TableRow key={theatre.theatreId}>
                            <TableCell className="font-medium">{theatre.name}</TableCell>
                            <TableCell className="hidden md:table-cell">
                                {theatre.city}, {theatre.state} {theatre.zipCode}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                <span className="block">{theatre.phone}</span>
                                <span className="block text-sm text-muted-foreground">{theatre.email}</span>
                            </TableCell>
                            <TableCell>{theatre.licenseNumber}</TableCell>
                            <TableCell>
                                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(theatre.status)}`}>
                                    {theatre.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => openModal(theatre)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            <span>View Details</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedTheatre && (
                <ViewTheatreDetailsModal
                    theatre={selectedTheatre}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onVerify={onVerify}
                    onReject={onReject}
                />
            )}
        </div>
    )
}

function getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
        case 'active':
            return 'bg-green-100 text-green-800'
        case 'pending':
            return 'bg-yellow-100 text-yellow-800'
        case 'rejected':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export default TheatresTable

