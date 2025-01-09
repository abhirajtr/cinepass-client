import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Updated mock data to include time
const allTransactions = [
    { id: 1, datetime: '2023-07-01T14:30:00', description: 'Movie Ticket: Avengers', amount: -15.00 },
    { id: 2, datetime: '2023-06-30T10:15:00', description: 'Added Money', amount: 50.00 },
    { id: 3, datetime: '2023-06-28T20:45:00', description: 'Movie Ticket: Inception', amount: -12.00 },
    { id: 4, datetime: '2023-06-25T18:30:00', description: 'Movie Ticket: The Godfather', amount: -10.00 },
    { id: 5, datetime: '2023-06-20T09:00:00', description: 'Added Money', amount: 100.00 },
    { id: 6, datetime: '2023-06-15T21:15:00', description: 'Movie Ticket: Pulp Fiction', amount: -13.00 },
    { id: 7, datetime: '2023-06-10T16:45:00', description: 'Movie Ticket: The Dark Knight', amount: -14.00 },
    { id: 8, datetime: '2023-06-05T11:30:00', description: 'Added Money', amount: 75.00 },
    { id: 9, datetime: '2023-06-01T19:00:00', description: 'Movie Ticket: Forrest Gump', amount: -11.00 },
    { id: 10, datetime: '2023-05-28T15:30:00', description: 'Movie Ticket: The Matrix', amount: -12.00 },
]

const ITEMS_PER_PAGE = 5

const TransactionHistory= () => {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(allTransactions.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentTransactions = allTransactions.slice(startIndex, endIndex)

    // Function to format date and time
    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString)
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Date & Time</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{formatDateTime(transaction.datetime)}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell className={`text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    &#8377;{Math.abs(transaction.amount).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default TransactionHistory;