import adminApi from "../../axiosInstance/adminApi";
import TheatresTable from "../../components/Admin/TheatresTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useDebounce } from "../../hooks/useDebounce";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Theatre {
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
const TheatreManagementPageAdmin = () => {
    const [theatres, setTheatres] = useState<Theatre[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [theatresPerPage, setTheatresPerPage] = useState<number>(10);


    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const response = await adminApi.get("/theatres", {
                    params: { searchTerm: debouncedSearchTerm, status: statusFilter }
                });
                setTheatres(response.data.responseData.theatres);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.responseMessage);
                }
                console.log(error);
            }
        }
        fetchTheatres();
    }, [debouncedSearchTerm, statusFilter]);

    const handleVerify = async (theatreId: string) => {
        try {
            const response = await adminApi.patch(`/theatre/${theatreId}/verify`);
            console.log("response",response);
            toast.success(response.data.responseMessage);
            setTheatres(
                theatres.map((item) =>
                    item.theatreId === theatreId ?
                        { ...item, status: "verified" } :
                        item
                )
            );
            
        } catch (error) {
            console.log("error",error);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occured");
            }
        }
    }
    const handleReject = async (theatreId: string, reason: string) => {
        try {
            if (reason == "") {
                toast.error("Please enter a reason for the rejection");
                return;
            }
            const response = await adminApi.patch(`/theatre/${theatreId}/reject`, { reason: reason });
            toast.success(response.data.responseMessage);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.responseMessage || "An unexpected error occured");
            }
        }
    }
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-5">Theatre Management</h1>
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
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={theatresPerPage.toString()} onValueChange={(value) => setTheatresPerPage(Number(value))}>
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
                <TheatresTable theatres={theatres} onVerify={handleVerify} onReject={handleReject} />
            </div>
                <div className="flex items-center justify-between space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                    // onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    // disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm font-medium">
                        {/* Page {currentPage} of {totalPages} */}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                    // onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    // disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
        </div>
    )
}

export default TheatreManagementPageAdmin;