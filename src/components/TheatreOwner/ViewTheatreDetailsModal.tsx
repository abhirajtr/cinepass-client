import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ViewTheatreDetailsModalProps {
    theatre: {
        theatreId: string;
        theatreName: string;
        contactEmail: string;
        contactNumber: string;
        streetAddress: string;
        city: string;
        state: string;
        zipCode: string;
        status: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

export default function ViewTheatreDetailsModal({ theatre, isOpen, onClose }: ViewTheatreDetailsModalProps) {
    const { status } = theatre;
    const badgeVariant = status === "pending" ? 'secondary' : status === "rejected" ? "destructive" : "default";
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{theatre.theatreName}</DialogTitle>
                    <DialogDescription>
                        Complete details of the theatre
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Status:</span>
                        <Badge variant={badgeVariant} className="col-span-3">
                            {theatre.status}
                        </Badge>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Email:</span>
                        <span className="col-span-3">{theatre.contactEmail}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Phone:</span>
                        <span className="col-span-3">{theatre.contactNumber}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Address:</span>
                        <span className="col-span-3">
                            {theatre.streetAddress}, {theatre.city}, {theatre.state} {theatre.zipCode}
                        </span>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}