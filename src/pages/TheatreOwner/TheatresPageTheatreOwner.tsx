import { useEffect, useState } from 'react'
import TheatreCard from '@/components/TheatreCard'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import theatreOwnerApi from '@/axiosInstance/theatreOwnerApi'
import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'


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

export interface AddTheatre {
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


const TheatresPageTheatreOwner = () => {
    const [theatres, setTheatres] = useState<Theatre[]>([])
    // const [isAddingTheatre, setIsAddingTheatre] = useState(false);

    useEffect(() => {
        const fetchTheatres = async () => {
            try {
                const response = await theatreOwnerApi.get("/getAllTheatres");
                setTheatres(response.data.responseData.theatres);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.responseMessage || "An unexpected error occured");
                }
                console.log(error);
            }
        }
        fetchTheatres();
    }, []);

    return (
        <div className="container mx-auto p-6">
            {/* <PathNavigator pathSegments={pathSegments} /> */}

            {/* <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Theatres</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> */}

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">Theatre Management</h1>
                <Link to="add-theatre" className={buttonVariants({ variant: "outline" })}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Theatre
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {theatres.map((theatre) => (
                    <TheatreCard key={theatre.theatreId} theatre={theatre} />
                ))}
            </div>
        </div>
    )
}

export default TheatresPageTheatreOwner;