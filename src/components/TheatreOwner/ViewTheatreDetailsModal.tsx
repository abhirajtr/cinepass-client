import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ViewDocumentModal } from "../Admin/ViewDocumentModal";
import { useState } from "react";
import { FileText } from "lucide-react";

interface ViewTheatreDetailsModalProps {
    theatre: {
        theatreId: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        licenseNumber: string;
        status: string;
        verificationDocument: string
    };
    isOpen: boolean;
    onClose: () => void;
}

export default function ViewTheatreDetailsModal({ theatre, isOpen, onClose }: ViewTheatreDetailsModalProps) {
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

    const { status } = theatre;
    const badgeVariant = status === "pending" ? 'secondary' : status === "rejected" ? "destructive" : "default";
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{theatre.name}</DialogTitle>
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
                        <span className="col-span-3">{theatre.email}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Phone:</span>
                        <span className="col-span-3">{theatre.phone}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Address:</span>
                        <span className="col-span-3">
                            {theatre.address}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">License number:</span>
                        <span className="col-span-3">{theatre.licenseNumber}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-medium">Verification document:</span>
                        <span className="col-span-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsDocumentModalOpen(true)}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                View Document
                            </Button>
                        </span>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
            <ViewDocumentModal
                isOpen={isDocumentModalOpen}
                onClose={() => setIsDocumentModalOpen(false)}
                verificationDocument={theatre.verificationDocument}
                theatreName={theatre.name}
            />
        </Dialog>
    )
}
