import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Plus, Eye, Edit, Film } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { buttonVariants } from "../../components/ui/button"
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import theatreOwnerApi from '../../axiosInstance/theatreOwnerApi'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb'

interface Screen {
    id: string
    name: string
    capacity: number
}

const ScreenCard: React.FC<{ screen: Screen, theatreId: string }> = ({ screen, theatreId }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{screen.name}</span>
                    {/* <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button> */}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>Capacity: {screen.capacity}</p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{screen.name} Details</DialogTitle>
                            <DialogDescription>
                                Detailed information about {screen.name}
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-[60vh] mt-4">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold">Capacity</h4>
                                    <p>{screen.capacity} seats</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Features</h4>
                                    {/* Add features here if available */}
                                </div>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
                <Link to={`/theatreOwner/theatres/${theatreId}/screens/${screen.id}/edit`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Screen
                </Link>
                <Link to={`/theatreOwner/theatres/${theatreId}/screens/${screen.id}/show-management`} className={buttonVariants({ variant: "outline", className: "w-full" })}>
                    <Film className="mr-2 h-4 w-4" /> Manage Shows
                </Link>
            </CardFooter>
        </Card>
    )
}

const ScreenManagement: React.FC = () => {

    const [screens, setScreens] = useState<Screen[]>([]);
    const { theatreId } = useParams();

    useEffect(() => {
        const fetchScreens = async () => {
            try {
                const response = await theatreOwnerApi.get(`/theatre/${theatreId}/getAllScreens`);
                const screensData = response.data?.responseData?.screens || [];
                setScreens(screensData);
                console.log(response.data.responseData.screens);
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.responseMessage || "An unexpected error occurred");
                }
            }
        }
        fetchScreens();
    }, [theatreId]);

    return (
        <div className="container mx-auto p-4">
            <Breadcrumb className='mb-3'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/theatreOwner/theatres">Theatres</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Screens</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl font-bold">Screen Management</h1>
                <Link className={buttonVariants({ variant: "outline" })} to={`/theatreOwner/theatres/${theatreId}/add-screen`}>
                    <Plus className="mr-2 h-4 w-4" /> Add Screen
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {screens.map((screen) => (
                    <ScreenCard key={screen.id} screen={screen} theatreId={theatreId!} />
                ))}
            </div>
        </div>
    )
}

export default ScreenManagement;

