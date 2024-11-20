'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BlockUnblockConfirmationModal } from '@/components/Admin/BlockUnblockConfirmationModal'
import { UserDetailsModal } from '@/components/Admin/UserDetailsModal'
import { UserTable } from '@/components/Admin/UserTable'
import adminApi from '@/axiosInstance/adminApi'

interface User {
    userId: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    isBlocked: boolean;
}

export default function UserManagementPageAdmin() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [totalUsers, setTotalUsers] = useState<number>(1)
    const [statusFilter, setStatusFilter] = useState('all')
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [userToToggle, setUserToToggle] = useState<User | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const params = { search: searchTerm, status: statusFilter, usersPerPage, currentPage }
                const response = await adminApi.get<{ users: User[], totalUsers: number }>(`/users`, { params });
                setUsers(response.data.users);
                setTotalUsers(response.data.totalUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, [searchTerm, statusFilter, currentPage, usersPerPage]);

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const handleBlockToggle = (user: User) => {
        setUserToToggle(user);
        setIsConfirmModalOpen(true);
    }

    const confirmBlockToggle = async () => {
        if (userToToggle) {
            try {
                const updatedUsers = users.map(u =>
                    u.userId === userToToggle.userId ? { ...u, isBlocked: !u.isBlocked } : u
                );
                setUsers(updatedUsers);
                await adminApi.patch(`/users/${userToToggle.userId}/toggle-block`, { blockStatus: userToToggle.isBlocked ? false : true });
            } catch (error) {
                const revertUsers = users.map(u =>
                    u.userId === userToToggle.userId ? { ...u, isBlocked: userToToggle.isBlocked } : u
                );
                setUsers(revertUsers);
                console.error('Error toggling user block status:', error);
            }
        }
        setIsConfirmModalOpen(false);
        setUserToToggle(null);
    }

    const handleViewDetails = (user: User) => {
        setSelectedUser(user)
        setIsUserDetailsModalOpen(true)
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-5">User Management</h1>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="active">Active Users</SelectItem>
                            <SelectItem value="blocked">Blocked Users</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={usersPerPage.toString()} onValueChange={(value) => setUsersPerPage(Number(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Users per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10 per page</SelectItem>
                            <SelectItem value="20">20 per page</SelectItem>
                            <SelectItem value="50">50 per page</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="rounded-md border">
                <UserTable
                    users={users}
                    onViewDetails={handleViewDetails}
                    onBlockToggle={handleBlockToggle}
                />
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>

            <UserDetailsModal
                user={selectedUser}
                isOpen={isUserDetailsModalOpen}
                onClose={() => setIsUserDetailsModalOpen(false)}
            />

            <BlockUnblockConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmBlockToggle}
                isBlocking={userToToggle?.isBlocked === false}
            />
        </div>
    )
}