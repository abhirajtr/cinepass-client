import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface User {
    userId: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    isBlocked: boolean;
}

interface UserDetailsModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

const dateFormat = (data: string) => {
    const date = new Date(data);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about the selected user.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Name:</span>
                        <span className="col-span-3">{user.name}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Email:</span>
                        <span className="col-span-3">{user.email}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Phone:</span>
                        <span className="col-span-3">{user.phone}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Created:</span>
                        <span className="col-span-3">{dateFormat(user.createdAt)}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Status:</span>
                        <span className="col-span-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {user.isBlocked ? 'Blocked' : 'Active'}
                            </span>
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}