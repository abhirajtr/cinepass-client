import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Eye, Lock, Unlock, MoreHorizontal } from 'lucide-react'

interface User {
    userId: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    isBlocked: boolean;
}

interface UserTableProps {
    users: User[];
    onViewDetails: (user: User) => void;
    onBlockToggle: (user: User) => void;
}

const dateFormat = (data: string) => {
    const date = new Date(data);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export function UserTable({ users, onViewDetails, onBlockToggle }: UserTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {/* <TableHead>Name</TableHead> */}
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.userId}>
                        {/* <TableCell className="font-medium">{user.name}</TableCell> */}
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                        <TableCell className="hidden md:table-cell">{dateFormat(user.createdAt)}</TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {user.isBlocked ? 'Blocked' : 'Active'}
                            </span>
                        </TableCell>
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
                                    <DropdownMenuItem onClick={() => onViewDetails(user)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>View Details</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => onBlockToggle(user)}>
                                        {user.isBlocked ? (
                                            <>
                                                <Unlock className="mr-2 h-4 w-4" />
                                                <span>Unblock User</span>
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="mr-2 h-4 w-4" />
                                                <span>Block User</span>
                                            </>
                                        )}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}