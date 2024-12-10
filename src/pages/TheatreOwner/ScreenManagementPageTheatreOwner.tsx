import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Settings, Eye } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { buttonVariants } from "@/components/ui/button"


interface Screen {
    id: string
    name: string
    capacity: number
    type: string
    features: string[]
}

const mockScreens: Screen[] = [
    { id: '1', name: 'Screen 1', capacity: 150, type: 'Standard', features: ['Dolby Audio', '4K Projection'] },
    { id: '2', name: 'Screen 2', capacity: 200, type: 'IMAX', features: ['IMAX 3D', 'Dolby Atmos'] },
    { id: '3', name: 'Screen 3', capacity: 100, type: 'VIP', features: ['Recliner Seats', 'In-seat Service'] },
    { id: '4', name: 'Screen 4', capacity: 180, type: 'Standard', features: ['3D Capable', 'Surround Sound'] },
]

const ScreenCard: React.FC<{ screen: Screen }> = ({ screen }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{screen.name}</span>
                    <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>Capacity: {screen.capacity}</p>
                <p>Type: {screen.type}</p>
            </CardContent>
            <CardFooter>
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
                                    <h4 className="font-semibold">Type</h4>
                                    <p>{screen.type}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Features</h4>
                                    <ul className="list-disc list-inside">
                                        {screen.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}

const ScreenManagement: React.FC = () => {
    const { theatreId } = useParams();
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Screen Management</h1>
                <Link className={buttonVariants({ variant: "outline" })} to={`/theatreOwner/theatres/${theatreId}/add-screen`} >
                    <Plus className="mr-2 h-4 w-4" /> Add Screen
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockScreens.map((screen) => (
                    <ScreenCard key={screen.id} screen={screen} />
                ))}
            </div>
        </div>
    )
}

export default ScreenManagement;