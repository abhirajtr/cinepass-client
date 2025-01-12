import { Ticket, Circle, AlertCircle, CheckCircle } from "lucide-react";

import { Button } from "../../components/ui/button";

const Notifications = () => {
    return (
        <div className="bg-background p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">Notifications</h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Mark all as read
                </Button>
            </div>
            <div className="space-y-3">
                <div className="flex items-start space-x-4 bg-secondary/50 p-4 rounded-lg">
                    <div className="bg-primary text-primary-foreground p-2 rounded-full">
                        <Ticket className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold">Movie Ticket Confirmed</h3>
                        <p className="text-muted-foreground text-sm">
                            Your ticket for &quot;Inception&quot; on June 15th at 7:30 PM is confirmed.
                        </p>
                        <span className="text-xs text-muted-foreground block mt-2">2 hours ago</span>
                    </div>
                    <div className="text-muted-foreground">
                        <Circle className="w-3 h-3 fill-primary" />
                    </div>
                </div>
                <div className="flex items-start space-x-4 bg-secondary/30 p-4 rounded-lg">
                    <div className="bg-destructive text-destructive-foreground p-2 rounded-full">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold">Seat Change Required</h3>
                        <p className="text-muted-foreground text-sm">
                            Your previous seat is no longer available. Please select a new seat.
                        </p>
                        <span className="text-xs text-muted-foreground block mt-2">4 hours ago</span>
                    </div>
                    <div className="text-muted-foreground">
                        <Circle className="w-3 h-3 fill-primary" />
                    </div>
                </div>
                <div className="flex items-start space-x-4 bg-secondary/30 p-4 rounded-lg">
                    <div className="bg-accent text-accent-foreground p-2 rounded-full">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold">Payment Successful</h3>
                        <p className="text-muted-foreground text-sm">
                            Your payment for movie tickets has been processed successfully.
                        </p>
                        <span className="text-xs text-muted-foreground block mt-2">1 day ago</span>
                    </div>
                    <div className="text-muted-foreground">
                        <Circle className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;