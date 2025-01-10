import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"

interface CancelConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    showTime: string
    isLoading: boolean
}

const cancellationThresholdInMinutes = 60;


export function CancelConfirmationModal({ isOpen, onClose, onConfirm, showTime, isLoading }: CancelConfirmationModalProps) {
    const showDateTime = new Date(showTime)
    const now = new Date()
    const timeDifference = showDateTime.getTime() - now.getTime()
    const minutesDifference = Math.floor(timeDifference / (1000 * 60))

    const canCancel = minutesDifference > cancellationThresholdInMinutes
    function formatTimeThreshold(minutes: number): string {
        if (minutes >= 60) {
            const hours = minutes / 60;
            return `${hours} hour${hours > 1 ? 's' : ''}`; 
        }
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{canCancel ? "Confirm Cancellation" : "Unable to Cancel"}</DialogTitle>
                    <DialogDescription>
                        {canCancel
                            ? "Are you sure you want to cancel this ticket? This action cannot be undone."
                            : `Sorry, you can't cancel this ticket as the show starts in ${minutesDifference} minutes. Cancellations are only allowed up to ${formatTimeThreshold(cancellationThresholdInMinutes)} before the show time.`
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {canCancel ? (
                        <>
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                            <Button variant="destructive" onClick={onConfirm}>{isLoading ? 'Cancelling....': 'Confirm Cancellation'}</Button>
                        </>
                    ) : (
                        <Button variant="outline" onClick={onClose}>Close</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
