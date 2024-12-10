import adminApi from "@/axiosInstance/adminApi";
import TheatresTable from "@/components/Admin/TheatresTable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
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
            toast.success(response.data.responseMessage);
            setTheatres(
                theatres.map((item) =>
                    item.theatreId === theatreId ?
                        { ...item, status: "verified" } :
                        item
                )
            );
        } catch (error) {
            console.log(error);
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
                </div>
            </div>
            <div className="rounded-md border">
                <TheatresTable theatres={theatres} onVerify={handleVerify} onReject={handleReject} />
            </div>
        </div>
    )
}

export default TheatreManagementPageAdmin;