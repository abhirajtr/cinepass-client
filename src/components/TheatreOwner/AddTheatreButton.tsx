import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'

interface AddTheatreButtonProps {
    onClick: () => void
}

export default function AddTheatreButton({ onClick }: AddTheatreButtonProps) {
    return (
        <Button onClick={onClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Theatre
        </Button>
    )
}