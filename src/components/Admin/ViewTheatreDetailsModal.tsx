import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { FileText, CheckCircle, XCircle } from 'lucide-react'
import { Theatre } from '../../types/types'
import { ViewDocumentModal } from './ViewDocumentModal'
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"

interface ViewTheatreDetailsModalProps {
    theatre: Theatre | null
    isOpen: boolean
    onClose: () => void
    onVerify: (theatreId: string) => void
    onReject: (theatreId: string, reason: string) => void
}

const ViewTheatreDetailsModal: React.FC<ViewTheatreDetailsModalProps> = ({ theatre, isOpen, onClose, onVerify, onReject }) => {
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    if (!theatre) return null

    const handleVerify = () => {
        onVerify(theatre.theatreId);
        onClose();
    }

    const handleReject = () => {
        onReject(theatre.theatreId, rejectReason);
        setIsRejectDialogOpen(false);
        setRejectReason('');
        onClose();
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{theatre.name}</DialogTitle>
                        <DialogDescription>Theatre Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">OwnerId:</span>
                            <span className="col-span-3">{theatre.ownerId}</span>
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
                            <span className="col-span-3">{theatre.address}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">City:</span>
                            <span className="col-span-3">{theatre.city}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">State:</span>
                            <span className="col-span-3">{theatre.state}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Zip Code:</span>
                            <span className="col-span-3">{theatre.zipCode}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">License Number:</span>
                            <span className="col-span-3">{theatre.licenseNumber}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Status:</span>
                            <span className="col-span-3">{theatre.status}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="font-medium">Verification Document:</span>
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
                    {theatre.status === "pending" && (
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsRejectDialogOpen(true)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                            </Button>
                            <Button onClick={handleVerify}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Verify
                            </Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>
            <ViewDocumentModal
                isOpen={isDocumentModalOpen}
                onClose={() => setIsDocumentModalOpen(false)}
                verificationDocument={theatre.verificationDocument}
                theatreName={theatre.name}
            />
            <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Theatre</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting {theatre.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reject-reason" className="text-right">
                                Reason
                            </Label>
                            <Textarea
                                id="reject-reason"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleReject} disabled={!rejectReason.trim()}>Reject</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ViewTheatreDetailsModal

