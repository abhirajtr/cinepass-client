import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { DialogHeader, DialogFooter } from './ui/dialog'
import { Button } from "@/components/ui/button"

interface ConfirmModalProps {
    isConfirmModalOpen: boolean;
    setIsConfirmModalOpen: (isOpen: boolean) => void;
    confirmBlockToggle: () => void;
    description: string; // Added description prop
}

const ConfirmModal = ({ isConfirmModalOpen, setIsConfirmModalOpen, confirmBlockToggle, description }: ConfirmModalProps) => {
    return (
        <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogDescription>
                        {description} {/* Use the description prop here */}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>Cancel</Button>
                    <Button onClick={confirmBlockToggle}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmModal