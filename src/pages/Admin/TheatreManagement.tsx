import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
// import Modal from "../../layout/components/Modal";
import axiosInstance from "../../axiosInstance";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/constants";

interface Theatre {
    theatreId: string;
    theatreName: string;
    contactEmail: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    verificationDocument: string;
    ownerId: string;
    isVerified: boolean;
    createdAt: string;
}

const TheatreManagement = () => {
    const [theatres, setTheatres] = useState<Theatre[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewDetailsmodalOpen, setViewDetailsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTheatre, setSelectedTheatre] = useState<Theatre>();
    const [actionType, setActionType] = useState("");

    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const params = {
                    searchTerm,
                    userRole: roleFilter,
                    isVerified: statusFilter,
                    limit: 5,
                    currentPage,
                };
                const response = await axiosInstance.get<{
                    theatres: Theatre[];
                    totalCount: number;
                }>("/admin/theatres", { params });
                setTheatres(response.data.theatres);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("An unexpected error occured");
                }
            }
        };
        fetchTheatres();
    }, [searchTerm, roleFilter, statusFilter, currentPage]);

    const itemsPerPage = 5;

    const handleBlockUnblock = (theatre: Theatre) => {
        setSelectedUser(theatre);
        setActionType(theatre.isVerified ? "unblock" : "block");
        setModalOpen(true);
    };

    const confirmBlockUnblock = async () => {
        const response = await axiosInstance.post<{
            updatedUser: Theatre;
            message: string;
        }>("/admin/theatres/block-unblock", {
            theatreId: selectedTheatre?.theatreId,
            isVerified: !selectedTheatre?.isVerified,
        });
        toast.success(response.data.message);
        setTheatres(
            theatres.map((u) =>
                u.theatreId === response.data.updatedUser.theatreId
                    ? { ...u, isVerified: response.data.updatedUser.isVerified }
                    : u
            )
        );
    };

    const handleViewDetails = (theatre: Theatre) => {
        setSelectedTheatre(theatre);
        setViewDetailsModalOpen(true);
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-primary">Theatre Management</h2>
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="relative mb-4 md:mb-0 md:w-64">
                    <input
                        type="text"
                        placeholder="Search by theatreName or email"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg text-secondary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <div className="flex space-x-4">
                    <select
                        className="border rounded-lg px-4 py-2 text-secondary"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="regularUser">Regular Theatre</option>
                        <option value="theatreOwner">Theatre Owner</option>
                    </select>
                    <select
                        className="border rounded-lg px-4 py-2 text-secondary"
                        value={statusFilter === null ? "null" : statusFilter.toString()}
                        onChange={(e) => {
                            const value = e.target.value;
                            setStatusFilter(
                                value === "null" ? null : value === "true" ? true : false
                            );
                        }}
                    >
                        <option value="null">All Statuses</option>
                        <option value="false">Unblocked</option>
                        <option value="true">Blocked</option>
                    </select>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Theatre Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                City
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Added On
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {theatres.map((theatre) => {
                            return (
                                <tr key={theatre.theatreId}>
                                    <td className="px-6 py-4 whitespace-nowrap">{theatre.theatreName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{theatre.contactEmail}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{theatre.phoneNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{theatre.city}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${!theatre.isVerified
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {theatre.isVerified ? "Verified" : "Not Verified"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(theatre.createdAt)}</td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <Button
                                            onClick={() => handleViewDetails(theatre)}
                                            className={`px-4 min-w-24 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700`}>
                                            View details
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div>
                    {/* Pagination info can go here if necessary */}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded-md disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm text-gray-700">Page {currentPage}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="px-3 py-1 border rounded-md disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            {viewDetailsmodalOpen && selectedTheatre &&
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4"> Theatre Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium">Theatre Name</h4>
                                    <p>{selectedTheatre.theatreName}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">Contact Email</h4>
                                    <p>{selectedTheatre.contactEmail}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">Phone Number</h4>
                                    <p>{selectedTheatre.phoneNumber}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">Street Address</h4>
                                    <p>{selectedTheatre.streetAddress}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">City</h4>
                                    <p>{selectedTheatre.city}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">State</h4>
                                    <p>{selectedTheatre.state}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">ZIP Code</h4>
                                    <p>{selectedTheatre.zipCode}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">Verification Status</h4>
                                    <p>{selectedTheatre.isVerified ? "Verified" : "Not Verified"}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">Created At</h4>
                                    <p>{formatDate(selectedTheatre.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    // onClick={onClose}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // Optionally implement confirm logic here
                                        onClose();
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    );
};

export default TheatreManagement;
