import { FC } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Eye, Lock, MoreHorizontal } from "lucide-react";

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

interface TheatresTableProps {
    theatre: Theatre[];
}

const TheatresTable: FC<TheatresTableProps> = ({ theatre }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Theatre Name</TableHead>
                    <TableHead>Contact Email</TableHead>
                    <TableHead className="hidden md:table-cell">Contact Number</TableHead>
                    <TableHead className="hidden md:table-cell">Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    theatre.map((theatre) => (
                        <TableRow>
                            <TableCell className="font-medium">{theatre.theatreName}</TableCell>
                            <TableCell>{theatre.contactEmail}</TableCell>
                            <TableCell className="hidden md:table-cell">{theatre.contactNumber}</TableCell>
                            <TableCell className="hidden md:table-cell">2024-01-01</TableCell>
                            <TableCell>{theatre.status}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            <Eye className="mr-2 h-4 w-4" />
                                            <span>View Details</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Lock className="mr-2 h-4 w-4" />
                                            <span>Verify</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default TheatresTable