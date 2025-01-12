import { FC, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Transaction {
    amount: number;
    description: string;
    type: "credit" | "debit";
    createdAt: string;
}
interface TransactionsProps {
    transaction: Transaction[]
}

const ITEMS_PER_PAGE = 5

const TransactionHistory: FC<TransactionsProps> = ({ transaction }) => {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(transaction.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentTransactions = transaction.slice(startIndex, endIndex)

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
                        {currentTransactions.map((t, index) => (
                            <TableRow key={index}>
                                <TableCell>{formatDateTime(t.createdAt)}</TableCell>
                                <TableCell>{t.description}</TableCell>
                                <TableCell className={`text-right ${t.type === "debit" ? 'text-red-500' : 'text-green-500'}`}>
                                    &#8377;{t.amount / 100}
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